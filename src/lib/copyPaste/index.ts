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

export const nodeClipboard = writable<
  | {
      node: Node;
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

  return function pasteNode(screenPos: XYPosition) {
    const $nodeClipboard = get(nodeClipboard);
    if (!$nodeClipboard) return;
    const newNode = structuredClone($nodeClipboard.node);
    const newEdges = structuredClone($nodeClipboard.edges);

    // Replate id's
    const newId = crypto.randomUUID();
    for (const edge of newEdges) {
      edge.id = crypto.randomUUID();
      if (edge.source === newNode.id) {
        edge.source = newId;
      } else if (edge.target === newNode.id) {
        edge.target = newId;
      }
    }
    newNode.id = newId;

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

    newNode.position = parent ? parent?.relative_pos : position;
    newNode.parentNode = parent?.node?.id;

    addHistoryEntry({
      type: "create",
      nodes: [newNode],
      edges: newEdges,
    });
    nodes.update(($nodes) => [...$nodes, newNode]);
    edges.update(($edges) => [...$edges, ...newEdges]);
  };
}

export function useCopy() {
  const { getNode, deleteElements } = useSvelteFlow();

  const edges = useEdges();

  async function copy(id: string, copyConnections = false) {
    const node = getNode(id);
    if (!node) return;
    const connectedEdges = copyConnections
      ? getConnectedEdges([node], get(edges))
      : [];
    nodeClipboard.set({ node, edges: connectedEdges });
  }

  async function cut(id: string) {
    const deleted = await deleteElements({ nodes: [{ id }] });
    addHistoryEntry({
      type: "delete",
      nodes: deleted.deletedNodes,
      edges: deleted.deletedEdges,
    });
    const node = deleted.deletedNodes[0];
    if (!node) return;
    nodeClipboard.set({ node, edges: deleted.deletedEdges });
  }

  return { copy, cut };
}
