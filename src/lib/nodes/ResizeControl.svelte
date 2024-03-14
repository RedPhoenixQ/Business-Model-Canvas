<script lang="ts">
  import ResizeIcon from "$lib/icons/ResizeIcon.svelte";
  import { addHistoryEntry, type HistoryEntry } from "$lib/project/history";
  import { NodeResizeControl, useSvelteFlow, useNodes } from "@xyflow/svelte";

  type $$Props = NodeResizeControl["$$prop_def"] & {
    id: string;
    noHistory?: boolean;
  };

  export let id: $$Props["id"];
  export let onResizeStart: $$Props["onResizeStart"] = undefined;
  export let onResizeEnd: $$Props["onResizeEnd"] = undefined;
  export let noHistory = false;
  let _minWidth: $$Props["minWidth"] = 10;
  let _minHeight: $$Props["minHeight"] = 10;
  let _maxWidth: $$Props["maxWidth"] = Number.MAX_VALUE;
  let _maxHeight: $$Props["maxHeight"] = Number.MAX_VALUE;
  export {
    _minWidth as minWidth,
    _minHeight as minHeight,
    _maxWidth as maxWidth,
    _maxHeight as maxHeight,
  };

  const { getNode } = useSvelteFlow();
  const nodes = useNodes();
  /** The minimum distance from a node parent */
  const resizePadding = 20 as const;

  let minWidth: number;
  let minHeight: number;
  let maxWidth: number;
  let maxHeight: number;
  /**
   * Sets the minimum size to be outside the outermost contained node and
   * the maximun size to be the remaining space in the containing node, if any
   */
  function updateBoundaries() {
    // Reset boundaries
    minWidth = _minWidth ?? 10;
    minHeight = _minHeight ?? 10;
    maxWidth = _maxWidth ?? Number.MAX_VALUE;
    maxHeight = _maxHeight ?? Number.MAX_VALUE;

    for (const node of $nodes) {
      if (node.parentNode !== id) continue;
      minWidth = Math.max(
        minWidth,
        node.position.x + (node.width ?? node.computed?.width ?? 0),
      );
      minHeight = Math.max(
        minHeight,
        node.position.y + (node.height ?? node.computed?.height ?? 0),
      );
    }
    minWidth += resizePadding;
    minHeight += resizePadding;

    const node = getNode(id);
    if (!node?.parentNode) return;
    const parent = getNode(node?.parentNode);
    if (!parent) {
      return;
    }
    maxWidth = Math.min(
      (parent.width ?? parent.computed?.width ?? 0) -
        node.position.x -
        resizePadding,
      maxWidth,
    );
    maxHeight = Math.min(
      (parent.height ?? parent.computed?.height ?? 0) -
        node.position.y -
        resizePadding,
      maxHeight,
    );
  }

  let from: (HistoryEntry & { type: "resize" })["from"];
</script>

<div
  class="contents"
  on:pointerdown={() => {
    // Update boundaries before any drag event fires
    // This ensures that drag handlers use the newest boundaries
    updateBoundaries();
  }}
>
  <NodeResizeControl
    {...$$props}
    {minWidth}
    {minHeight}
    {maxWidth}
    {maxHeight}
    onResizeStart={(event, params) => {
      onResizeStart?.(event, params);
      from = params;
    }}
    onResizeEnd={(event, params) => {
      onResizeEnd?.(event, params);
      if (noHistory) return;
      addHistoryEntry({
        type: "resize",
        to: params,
        from,
        id,
      });
    }}
    position="bottom-right"
    style="background: none; border: none;"
  >
    <ResizeIcon
      class="pointer-events-auto -translate-x-full -translate-y-full opacity-50 transition-opacity hover:opacity-100"
    />
  </NodeResizeControl>
</div>
