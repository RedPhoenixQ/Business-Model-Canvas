import {
  useSvelteFlow,
  type Edge,
  type Node,
  type XYPosition,
  useStore,
} from "@xyflow/svelte";
import { RingBuffer } from "ring-buffer-ts";
import { derived, get, readonly, writable } from "svelte/store";

export type HistoryEntry =
  | {
      type: "delete";
      nodes: Node[];
      edges: Edge[];
    }
  | {
      type: "createNode";
      node: Node;
    }
  | {
      type: "createEdge";
      edge: Edge;
    }
  | {
      type: "nodeData";
      id: string;
      from: any;
      to: any;
    }
  | {
      type: "move";
      id: string;
      from: XYPosition;
      to: XYPosition;
    };

const UNDO_SIZE = 32 as const;
const REDO_SIZE = 32 as const;

const history = writable({
  undo: new RingBuffer<HistoryEntry>(UNDO_SIZE),
  redo: new RingBuffer<HistoryEntry>(REDO_SIZE),
});
history.subscribe((val) => console.debug("history", val));

export const readHistory = readonly(history);
export const undoEmpty = derived(history, ($history) => {
  return $history.undo.isEmpty();
});
export const redoEmpty = derived(history, ($history) => {
  return $history.redo.isEmpty();
});

export function addHistoryEntry(entry: HistoryEntry) {
  const $history = get(history);
  // TODO: Check that entry is valid (like not delete entry after undoing create)
  $history.undo.add(entry);
  $history.redo.clear();
  history.set($history);
}

export function getHistory() {
  const $history = get(history);
  return {
    undo: $history.undo.toArray(),
    redo: $history.redo.toArray(),
  };
}
export function setHistory(
  newHistory: { undo: HistoryEntry[]; redo: HistoryEntry[] } = {
    undo: [],
    redo: [],
  },
) {
  history.set({
    undo: RingBuffer.fromArray(newHistory.undo, UNDO_SIZE),
    redo: RingBuffer.fromArray(newHistory.redo, REDO_SIZE),
  });
}

export function useHistory() {
  const { updateNode, updateNodeData } = useSvelteFlow();
  const { nodes, edges } = useStore();

  function applyNodes(nodelist: Node[], add: boolean) {
    if (add) {
      nodes.update(($nodes) => {
        $nodes.push(...nodelist);
        return $nodes;
      });
    } else {
      nodes.update(($nodes) =>
        $nodes.filter((node) => !nodelist.some(({ id }) => node.id === id)),
      );
    }
  }
  function applyEdges(edgelist: Edge[], add: boolean) {
    if (add) {
      edges.update(($edges) => {
        $edges.push(...edgelist);
        return $edges;
      });
    } else {
      edges.update(($edges) =>
        $edges.filter((edge) => !edgelist.some(({ id }) => edge.id === id)),
      );
    }
  }

  function applyEntry(entry: HistoryEntry, undo: boolean) {
    switch (entry.type) {
      case "delete":
        console.log("apply delete");
        applyNodes(entry.nodes, undo);
        applyEdges(entry.edges, undo);
        break;
      case "createNode":
        applyNodes([entry.node], !undo);
        break;
      case "createEdge":
        applyEdges([entry.edge], !undo);
        break;
      case "nodeData":
        updateNodeData(entry.id, undo ? entry.from : entry.to);
        break;
      case "move":
        console.log("apply move");
        updateNode(entry.id, { position: undo ? entry.from : entry.to });
      default:
        break;
    }
  }

  function applyHistory(undo: boolean) {
    const $history = get(history);
    const entry = (undo ? $history.undo : $history.redo).removeLast();
    if (!entry) return;
    applyEntry(entry, undo);
    (undo ? $history.redo : $history.undo).add(entry);
    history.set($history);
  }

  return {
    applyHistory,
    undo() {
      applyHistory(true);
    },
    redo() {
      applyHistory(false);
    },
  };
}
