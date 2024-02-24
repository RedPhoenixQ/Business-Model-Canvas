<script lang="ts">
  import { MoveDiagonalIcon } from "lucide-svelte";
  import {
    type NodeProps,
    NodeResizeControl,
    useUpdateNodeInternals,
    useSvelteFlow,
  } from "@xyflow/svelte";
  import {
    segmentTemplateInfo,
    getDimensionsInGrid,
    type SegmentData,
    gridSize,
  } from ".";
  import { cn } from "$lib/utils";

  type $$Props = NodeProps<SegmentData>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

  const { getNode } = useSvelteFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  $: templateNodes = segmentTemplateInfo[data.template].nodes;
  $: segmentInfo = templateNodes[id as keyof typeof templateNodes];

  $: cols = segmentInfo.grid.column.end - segmentInfo.grid.column.start;
  $: rows = segmentInfo.grid.row.end - segmentInfo.grid.row.start;

  $: {
    const node = getNode(id);
    if (node) {
      const dim = getDimensionsInGrid($gridSize, segmentInfo.grid);
      if (
        node.position.x !== dim.position.x ||
        node.position.y !== dim.position.y ||
        node.width !== dim.width ||
        node.height !== dim.height
      ) {
        node.position.x = dim.position.x;
        node.position.y = dim.position.y;
        node.width = dim.width;
        node.height = dim.height;
        updateNodeInternals(id);
      }
    }
  }

  let prevWidth: number | null | undefined;
  let prevHeight: number | null | undefined;
  function onResizeStart() {
    const node = getNode(id);
    if (!node) {
      prevHeight = null;
      prevWidth = null;
    } else {
      prevWidth = node.width;
      prevHeight = node.height;
    }
  }
  function onResizeEnd() {
    const node = getNode(id);
    if (!node?.width || !node?.height || !prevWidth || !prevHeight) return;
    const dx = node.width - prevWidth;
    const dy = node.height - prevHeight;
    console.log("resize prev", prevWidth, prevHeight);
    console.log("resize", dx, dy);
    // TODO:  Find a better way of distributing the size increase.
    //        Should probably move a "grid line" instread of a block
    //        or respect minimum size of grid blocks
    for (
      let i = segmentInfo.grid.column.start;
      i < segmentInfo.grid.column.end;
      i++
    ) {
      $gridSize.columns[i] += dx / cols;
    }
    for (
      let i = segmentInfo.grid.row.start;
      i < segmentInfo.grid.row.end;
      i++
    ) {
      $gridSize.rows[i] += dy / rows;
    }
  }
</script>

<div
  class={cn(
    "h-full w-full border-2 border-white border-opacity-25 bg-gray-700 bg-opacity-50",
    segmentInfo.classes,
    $$restProps.class,
  )}
>
  <span class="px-2 text-white">{segmentInfo.title}</span>
  <NodeResizeControl
    position="top-right"
    style="background: none; border: none;"
    {onResizeStart}
    {onResizeEnd}
  >
    <MoveDiagonalIcon
      class="pointer-events-auto -translate-x-full translate-y-1"
      strokeWidth={1}
    />
  </NodeResizeControl>
</div>
