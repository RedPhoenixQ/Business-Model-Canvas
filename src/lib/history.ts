import {
  useSvelteFlow,
  type Edge,
  type Node,
  type Position,
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
      edges: Edge;
    }
  | {
      type: "move";
      prev: Position;
      next: Position;
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
  const { deleteElements } = useSvelteFlow();
  const { addEdge, nodes, edges } = useStore();

  function applyEntry(entry: HistoryEntry, undo: boolean) {
    switch (entry.type) {
      case "delete":
        console.log("apply delete");
        if (undo) {
          nodes.update(($nodes) => {
            $nodes.push(...entry.nodes);
            return $nodes;
          });
          edges.update(($edges) => {
            $edges.push(...entry.edges);
            return $edges;
          });
        } else {
          deleteElements(entry);
        }
        break;
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
