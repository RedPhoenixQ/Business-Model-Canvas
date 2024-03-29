import { get, writable } from "svelte/store";
import {
  type Node,
  type Edge,
  type XYPosition,
  useSvelteFlow,
  useNodes,
  useEdges,
  getConnectedEdges,
} from "@xyflow/svelte";
import { addHistoryEntry } from "$lib/project/history";
import { findFirstParentAndRelativePos } from "$lib/info/nodes";
import { findChildNodes } from "$lib/nodes";

export const nodeClipboard = writable<
  | {
      nodes: Node[];
      edges: Edge[];
    }
  | undefined
>();
nodeClipboard.subscribe(($nodeClipboard) =>
  console.debug("nodeClipboard", $nodeClipboard),
);

export function usePaste() {
  const { screenToFlowPosition, getIntersectingNodes } = useSvelteFlow();
  const nodes = useNodes();
  const edges = useEdges();

  return function pasteNode(screenPos: XYPosition, pasteConnections = true) {
    const $nodeClipboard = get(nodeClipboard);
    if (!$nodeClipboard) return;
    const newNodes = structuredClone($nodeClipboard.nodes);
    const newEdges = pasteConnections
      ? structuredClone($nodeClipboard.edges)
      : [];

    const idsMap: Map<string, string> = new Map();

    // Replate id's
    for (const node of newNodes) {
      const newId = crypto.randomUUID();
      idsMap.set(node.id, newId);
      node.id = newId;
    }
    for (const edge of newEdges) {
      edge.id = crypto.randomUUID();
      const sourceId = idsMap.get(edge.source);
      const targetId = idsMap.get(edge.target);
      if (sourceId) {
        edge.source = sourceId;
      } else if (targetId) {
        edge.target = targetId;
      }
    }

    const position = screenToFlowPosition(screenPos);
    const intersecting = getIntersectingNodes({
      ...position,
      width: 1,
      height: 1,
    });
    console.debug("paste intersection", intersecting);
    const parent = findFirstParentAndRelativePos(
      intersecting.filter(
        (node) => node.type === "segment" || node.type === "customGroup",
      ),
      position,
    );

    const newPos = parent ? parent?.relative_pos : position;
    for (const [i, node] of newNodes.entries()) {
      const parentId = idsMap.get(node.parentNode!);
      if (parentId) {
        // If nodes parent was also copied, the parent relation should remain
        node.parentNode = idsMap.get(node.parentNode!);
      } else {
        // Else the new parent and position should be set
        const width = node.width ?? node.computed?.width ?? 0;
        const height = node.height ?? node.computed?.height ?? 0;
        node.position.x = newPos.x - width / 2 + 5 * i;
        node.position.y = newPos.y - height / 2 + 5 * i;
        node.parentNode = parent?.node?.id;
      }
      node.selected = false;
    }

    addHistoryEntry({
      type: "create",
      nodes: newNodes,
      edges: newEdges,
    });
    nodes.update(($nodes) => {
      // Unselect all other nodes on paste
      for (const node of $nodes) {
        node.selected = false;
      }
      return [...$nodes, ...newNodes];
    });
    edges.update(($edges) => {
      // Unselect all other edges on paste
      for (const edge of $edges) {
        edge.selected = false;
      }
      return [...$edges, ...newEdges];
    });
  };
}

export function useCopy() {
  const { deleteElements } = useSvelteFlow();

  const edgesStore = useEdges();
  const nodesStore = useNodes();

  async function copy(nodes: Node[], copyConnections = true) {
    if (nodes.length === 0) return;

    nodes.push(...findChildNodes(nodes, get(nodesStore)));

    const edges = copyConnections
      ? getConnectedEdges(nodes, get(edgesStore))
      : [];
    nodeClipboard.set({ nodes, edges });
  }

  async function cut(nodes: Node[]) {
    const deleted = await deleteElements({ nodes });
    addHistoryEntry({
      type: "delete",
      nodes: deleted.deletedNodes,
      edges: deleted.deletedEdges,
    });
    nodeClipboard.set({
      nodes: deleted.deletedNodes,
      edges: deleted.deletedEdges,
    });
  }

  return { copy, cut };
}
