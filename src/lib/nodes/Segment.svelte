<script lang="ts">
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
  } from "./segments";
  import { twMerge } from "tailwind-merge";

  type $$Props = NodeProps<SegmentData>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

  const { getNode } = useSvelteFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const templateNodes = segmentTemplateInfo[data.template].nodes;

  const { title, classes, grid } =
    templateNodes[id as keyof typeof templateNodes];
  const cols = grid.column.end - grid.column.start;
  const rows = grid.row.end - grid.row.start;

  $: {
    const node = getNode(id);
    if (node) {
      const dim = getDimensionsInGrid($gridSize, grid);
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
    for (let i = grid.column.start; i < grid.column.end; i++) {
      $gridSize.columns[i] += dx / cols;
    }
    for (let i = grid.row.start; i < grid.row.end; i++) {
      $gridSize.rows[i] += dy / rows;
    }
  }
</script>

<div
  class={twMerge(
    "h-full w-full border-2 border-white border-opacity-25 bg-gray-700 bg-opacity-50",
    classes,
    $$restProps.class,
  )}
>
  <span class="px-2 text-white">{title}</span>
  <NodeResizeControl
    position="top-right"
    style="background: none; border: none;"
    {onResizeStart}
    {onResizeEnd}
  >
    <svg
      class="pointer-events-auto aspect-square w-6 -translate-x-full translate-y-1 stroke-black p-1 dark:stroke-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      ><g
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        ><path d="m304 96h112v112" /><path
          d="m405.77 106.2-293.79 293.82"
        /><path d="m208 416h-112v-112" /></g
      ></svg
    >
  </NodeResizeControl>
</div>
