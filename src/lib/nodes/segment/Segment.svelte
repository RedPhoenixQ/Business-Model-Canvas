<script lang="ts">
  import {
    type NodeProps,
    useUpdateNodeInternals,
    useSvelteFlow,
    type Dimensions,
  } from "@xyflow/svelte";
  import { getSegmentInfo, getDimensionsInGrid } from "$lib/info/segments";
  import { type SegmentData } from ".";
  import { cn } from "$lib/utils";
  import { addHistoryEntry } from "$lib/project/history";
  import { useProject } from "$lib/project";
  import ResizeControl from "../ResizeControl.svelte";

  type $$Props = NodeProps<SegmentData>;

  export let id: $$Props["id"];

  const { page, grid } = useProject();
  const { getNode } = useSvelteFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  $: segmentInfo = getSegmentInfo($page.template, id);

  $: cols = segmentInfo.grid.column.end - segmentInfo.grid.column.start;
  $: rows = segmentInfo.grid.row.end - segmentInfo.grid.row.start;

  $: {
    const node = getNode(id);
    if (node) {
      const dim = getDimensionsInGrid($grid, segmentInfo.grid);
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

  let prev: Dimensions;
  function resizeGrid(next: Dimensions) {
    const dx = next.width - prev.width;
    const dy = next.height - prev.height;
    console.log("resize prev", prev.width, prev.height);
    console.log("resize", dx, dy);
    const from = structuredClone($grid);
    // TODO:  Find a better way of distributing the size increase.
    //        Should probably move a "grid line" instread of a block
    //        or respect minimum size of grid blocks
    for (
      let i = segmentInfo.grid.column.start;
      i < segmentInfo.grid.column.end;
      i++
    ) {
      $grid.columns[i] += dx / cols;
    }
    for (
      let i = segmentInfo.grid.row.start;
      i < segmentInfo.grid.row.end;
      i++
    ) {
      $grid.rows[i] += dy / rows;
    }

    addHistoryEntry({
      type: "gridResize",
      to: structuredClone($grid),
      from,
    });
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
  <ResizeControl
    {id}
    noHistory
    onResizeStart={(_event, params) => (prev = params)}
    onResizeEnd={(_event, params) => resizeGrid(params)}
    minHeight={100}
    minWidth={150}
  />
</div>
