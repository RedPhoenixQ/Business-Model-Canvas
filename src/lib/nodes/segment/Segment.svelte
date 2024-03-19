<script lang="ts">
  import SegmentDescPopover from "./SegmentDescPopover.svelte";
  import {
    type NodeProps,
    useUpdateNodeInternals,
    useSvelteFlow,
    type Dimensions,
  } from "@xyflow/svelte";
  import {
    getSegmentInfo,
    getDimensionsInGrid,
  } from "$lib/info/segments/index";
  import { type SegmentData } from ".";
  import { cn } from "$lib/utils";
  import { addHistoryEntry } from "$lib/project/history";
  import { pageStore, gridStore } from "$lib/project";
  import ResizeControl from "../ResizeControl.svelte";

  type $$Props = NodeProps<SegmentData>;

  export let id: $$Props["id"];

  const { getNode } = useSvelteFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  $: segmentInfo = getSegmentInfo($pageStore.template, id);

  $: cols = segmentInfo.grid.column.end - segmentInfo.grid.column.start;
  $: rows = segmentInfo.grid.row.end - segmentInfo.grid.row.start;

  $: {
    const node = getNode(id);
    if (node) {
      const dim = getDimensionsInGrid($gridStore, segmentInfo.grid);
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
    console.debug("grid resize prev", prev.width, prev.height);
    console.debug("grid resize change", dx, dy);
    const from = structuredClone($gridStore);
    // TODO:  Find a better way of distributing the size increase.
    //        Should probably move a "grid line" instread of a block
    //        or respect minimum size of grid blocks
    for (
      let i = segmentInfo.grid.column.start;
      i < segmentInfo.grid.column.end;
      i++
    ) {
      $gridStore.columns[i] += dx / cols;
    }
    for (
      let i = segmentInfo.grid.row.start;
      i < segmentInfo.grid.row.end;
      i++
    ) {
      $gridStore.rows[i] += dy / rows;
    }

    addHistoryEntry({
      type: "gridResize",
      to: structuredClone($gridStore),
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
  <div class="flex justify-between">
    <span class="px-2 text-white">{segmentInfo.title}</span>
    <SegmentDescPopover info={segmentInfo} />
  </div>
  <ResizeControl
    {id}
    noHistory
    onResizeStart={(_event, params) => (prev = params)}
    onResizeEnd={(_event, params) => resizeGrid(params)}
    minHeight={100}
    minWidth={150}
  />
</div>
