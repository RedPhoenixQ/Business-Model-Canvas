import {
  useSvelteFlow,
  type Edge,
  type Node,
  type XYPosition,
  useStore,
  type Dimensions,
} from "@xyflow/svelte";
import { RingBuffer } from "ring-buffer-ts";
import { derived, get, readonly, writable } from "svelte/store";
import { gridStore, type Grid } from ".";

export type HistoryEntry =
  | {
      type: "delete" | "create";
      nodes?: Node[];
      edges?: Edge[];
    }
  | {
      type: "nodeData" | "edgeData";
      id: string;
      from: object;
      to: object;
    }
  | {
      type: "move";
      id: string;
      from: XYPosition;
      to: XYPosition;
      parent?: {
        // Need to set null and not undefined so that the change is not ignored
        // when setting the parent.
        // Works in version 0.0.41 of @xyflow/svelte
        to: string | null;
        from: string | null;
      };
    }
  | {
      type: "resize";
      id: string;
      from: Dimensions & XYPosition;
      to: Dimensions & XYPosition;
    }
  | {
      type: "gridResize";
      from: Grid;
      to: Grid;
    };

const UNDO_SIZE = 32 as const;
const REDO_SIZE = 32 as const;

const historyStore = writable({
  undo: new RingBuffer<HistoryEntry>(UNDO_SIZE),
  redo: new RingBuffer<HistoryEntry>(REDO_SIZE),
});
historyStore.subscribe((val) => console.debug("history", val));

const lastHandledHistoryStore = writable<HistoryEntry | undefined>();

export const lastEntry = readonly(lastHandledHistoryStore);
export const readHistory = readonly(historyStore);
export const undoEmpty = derived(historyStore, ($history) => {
  return $history.undo.isEmpty();
});
export const redoEmpty = derived(historyStore, ($history) => {
  return $history.redo.isEmpty();
});

export function addHistoryEntry(entry: HistoryEntry) {
  const $history = get(historyStore);
  // TODO: Check that entry is valid (like not delete entry after undoing create)
  $history.undo.add(entry);
  $history.redo.clear();
  historyStore.set($history);
  lastHandledHistoryStore.set(entry);
}

export function getHistory() {
  const $history = get(historyStore);
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
  lastHandledHistoryStore.set(undefined);
  historyStore.set({
    undo: RingBuffer.fromArray(newHistory.undo, UNDO_SIZE),
    redo: RingBuffer.fromArray(newHistory.redo, REDO_SIZE),
  });
}

export function useHistory() {
  const { updateNode, updateNodeData } = useSvelteFlow();
  const { nodes, edges } = useStore();

  function applyNodes(nodelist: Node[] | undefined, add: boolean) {
    if (!nodelist) return;
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
  function applyEdges(edgelist: Edge[] | undefined, add: boolean) {
    if (!edgelist) return;
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
    lastHandledHistoryStore.set(entry);
    switch (entry.type) {
      case "delete":
        applyNodes(entry.nodes, undo);
        applyEdges(entry.edges, undo);
        break;
      case "create":
        applyNodes(entry.nodes, !undo);
        applyEdges(entry.edges, !undo);
        break;
      case "nodeData":
        updateNodeData(entry.id, undo ? entry.from : entry.to, {
          replace: true,
        });
        break;
      case "edgeData":
        edges.update(($edges) => {
          const edge = $edges.find((edge) => edge.id === entry.id);
          if (edge) {
            edge.data = { ...edge.data, ...(undo ? entry.from : entry.to) };
          }
          return $edges;
        });
        break;
      case "move":
        console.debug("apply move");
        updateNode(entry.id, {
          position: undo ? entry.from : entry.to,
          // Convert to string | undefined for node types
          parentNode: (undo ? entry.parent?.from : entry.parent?.to) as
            | string
            | undefined,
        });
        break;
      case "resize": {
        console.debug("apply resize");
        const { width, height, x, y } = undo ? entry.from : entry.to;
        updateNode(entry.id, { width, height, position: { x, y } });
        break;
      }
      case "gridResize":
        console.debug("apply gridResize");
        gridStore.set(undo ? entry.from : entry.to);
        break;
      default:
        break;
    }
  }

  function applyHistory(undo: boolean) {
    const $history = get(historyStore);
    const entry = (undo ? $history.undo : $history.redo).removeLast();
    if (!entry) return;
    applyEntry(entry, undo);
    (undo ? $history.redo : $history.undo).add(entry);
    historyStore.set($history);
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
