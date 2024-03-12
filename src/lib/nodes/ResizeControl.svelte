<script lang="ts">
  import ResizeIcon from "$lib/icons/ResizeIcon.svelte";
  import {
    NodeResizeControl,
    useSvelteFlow,
    type XYPosition,
    useNodes,
  } from "@xyflow/svelte";

  type $$Props = NodeResizeControl["$$prop_def"] & {
    id: string;
  };

  export let id: string;

  const { getNode } = useSvelteFlow();
  const nodes = useNodes();
  /** The minimum distance from a node parent */
  const resizePadding = 5 as const;

  let maxContainedNode: XYPosition | undefined;
  function findMaxContainedNode(): XYPosition {
    const max: XYPosition = {
      x: 0,
      y: 0,
    };
    for (const node of $nodes) {
      if (node.parentNode !== id) continue;
      max.x = Math.max(
        max.x,
        node.position.x + (node.width ?? node.computed?.width ?? 0),
      );
      max.y = Math.max(
        max.y,
        node.position.y + (node.height ?? node.computed?.height ?? 0),
      );
    }
    return max;
  }
</script>

<NodeResizeControl
  {...$$props}
  position="bottom-right"
  style="background: none; border: none;"
  shouldResize={(_, { direction, width, height, x, y }) => {
    if (!maxContainedNode) {
      maxContainedNode = findMaxContainedNode();
    }
    console.log(maxContainedNode);

    const node = getNode(id);
    if (!node?.parentNode) return true;
    const parent = getNode(node?.parentNode);
    if (typeof parent?.width !== "number" || typeof parent?.height !== "number")
      return true;
    if (
      (direction[0] !== 0 &&
        (parent.width - resizePadding < resizePadding + x + width ||
          width - resizePadding < maxContainedNode.x + resizePadding)) ||
      (direction[1] !== 0 &&
        (parent.height - resizePadding < resizePadding + y + height ||
          height - resizePadding < maxContainedNode.y + resizePadding))
    ) {
      return false;
    }
    // TODO: Check for items inside aswell
    return true;
  }}
  onResizeEnd={(event) => {
    maxContainedNode = undefined;
    $$props?.onResizeEnd?.(event);
  }}
>
  <ResizeIcon
    class="pointer-events-auto -translate-x-full -translate-y-full opacity-50 transition-opacity hover:opacity-100"
  />
</NodeResizeControl>
