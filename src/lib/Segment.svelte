<script lang="ts">
  import { type NodeProps, NodeResizeControl, useStore } from "@xyflow/svelte";
  import {
    segmentInfo,
    type SegmentData,
    type SegmentKey,
    segmentRows,
    segmentColumns,
  } from "./segments";

  type $$Props = NodeProps<SegmentData>;

  export let id: $$Props["id"];

  const { nodeLookup, domNode, updateNodePositions } = useStore();

  const { title, colorClass, grid, size } = segmentInfo[id as SegmentKey];
  const cols = grid.column.end - grid.column.start;
  const rows = grid.row.end - grid.row.start;

  $: nodeElement = $domNode?.querySelector(
    `.svelte-flow__node[data-id="${id}"]`,
  ) as HTMLDivElement | undefined;
  $: node = $nodeLookup.get(id);

  $: if (node && nodeElement?.style) {
    node.width = 0;
    for (let i = grid.column.start; i < grid.column.end; i++) {
      node.width += $segmentColumns[i];
    }
    node.height = 0;
    for (let i = grid.row.start; i < grid.row.end; i++) {
      node.height += $segmentRows[i];
    }
    let new_x = 0;
    for (let i = 0; i < grid.column.start; i++) {
      new_x += $segmentColumns[i];
    }
    let new_y = -node.height;
    for (let i = 0; i < grid.row.start; i++) {
      new_y -= $segmentRows[i];
    }

    if (node.position.x !== new_x || node.position.y !== new_y) {
      node.position.x = new_x;
      node.position.y = new_y;
      updateNodePositions([node]);
    }
    // Manual size update because the nodes don't update automatically
    nodeElement.style.width = node.width + "px";
    nodeElement.style.height = node.height + "px";
  }

  function onResize() {
    if (!node?.width || !node?.height) return;
    const dx = offsetWidth - node.width;
    const dy = offsetHeight - node.height;
    for (let i = grid.column.start; i < grid.column.end; i++) {
      $segmentColumns[i] += dx / cols;
    }
    for (let i = grid.row.start; i < grid.row.end; i++) {
      $segmentRows[i] += dy / rows;
    }
  }

  let offsetWidth: number;
  let offsetHeight: number;
</script>

<div
  bind:offsetWidth
  bind:offsetHeight
  class="h-full w-full border-2 border-white border-opacity-25 bg-gray-700 bg-opacity-50 {colorClass} {$$restProps?.class ??
    ''}"
>
  <span class="px-2 text-white">{title}</span>
  <NodeResizeControl
    minHeight={size.height}
    minWidth={size.width}
    position="top-right"
    style="background: none; border: none;"
    {onResize}
    onResizeEnd={onResize}
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
