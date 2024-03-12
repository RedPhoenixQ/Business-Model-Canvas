<script lang="ts">
  import ResizeIcon from "$lib/icons/ResizeIcon.svelte";
  import { NodeResizeControl, useSvelteFlow } from "@xyflow/svelte";

  type $$Props = NodeResizeControl["$$prop_def"] & {
    id: string;
  };

  export let id: string;

  const { getNode } = useSvelteFlow();
  /** The minimum distance from a node parent */
  const resizePadding = 5 as const;
</script>

<NodeResizeControl
  {...$$props}
  position="bottom-right"
  style="background: none; border: none;"
  shouldResize={(_, { direction, width, height, x, y }) => {
    const node = getNode(id);
    if (!node?.parentNode) return true;
    const parent = getNode(node?.parentNode);
    if (typeof parent?.width !== "number" || typeof parent?.height !== "number")
      return true;
    if (
      (direction[0] !== 0 &&
        parent.width - resizePadding < resizePadding + x + width) ||
      (direction[1] !== 0 &&
        parent.height - resizePadding < resizePadding + y + height)
    ) {
      return false;
    }
    // TODO: Check for items inside aswell
    return true;
  }}
>
  <ResizeIcon
    class="pointer-events-auto -translate-x-full -translate-y-full opacity-50 transition-opacity hover:opacity-100"
  />
</NodeResizeControl>
