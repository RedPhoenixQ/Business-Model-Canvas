<script lang="ts">
  import { findFirstParentAndRelativePos } from "$lib/info/nodes";
  import { addHistoryEntry } from "$lib/project/history";
  import { useSvelteFlow, type Node, type XYPosition } from "@xyflow/svelte";

  export const onMove = handleMove;

  const { getIntersectingNodes, updateNode } = useSvelteFlow();

  /**
   * Automatically places the node in the first parent when moved ontop of it
   */
  function handleMove(node: Node, old_pos: XYPosition) {
    if (!node.computed?.positionAbsolute) {
      console.error("Node with no absolute position in move handler");
      return;
    }
    const position = {
      x: node.computed.positionAbsolute.x,
      y: node.computed.positionAbsolute.y,
    };
    const intersecting = getIntersectingNodes(node).filter(
      (n) => n.type === "segment" || n.type === "customGroup",
    );
    if (intersecting.length === 0) {
      addHistoryEntry({
        type: "move",
        id: node.id,
        from: old_pos,
        to: node.position,
      });
      updateNode(node.id, {
        parentNode: undefined,
        position,
      });
      return;
    }
    const parent = findFirstParentAndRelativePos(intersecting, position);
    if (parent) {
      addHistoryEntry({
        type: "move",
        id: node.id,
        from: old_pos,
        to: parent.relative_pos,
        parent: {
          from: node.parentNode ?? "UNKNOWN",
          to: parent.node.id,
        },
      });
      updateNode(node.id, {
        parentNode: parent.node.id,
        position: parent.relative_pos,
      });
    }
  }
</script>
