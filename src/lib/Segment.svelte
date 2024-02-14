<script lang="ts">
  import { type NodeProps, NodeResizeControl } from "@xyflow/svelte";
  import { segmentInfo, type SegmentData, type SegmentKey } from "./segments";

  type $$Props = NodeProps<SegmentData>;
  export let id: $$Props["id"];

  const { title, colorClass } = segmentInfo[id as SegmentKey];
</script>

<div
  class="h-full w-full border-2 border-white border-opacity-25 bg-gray-700 bg-opacity-50 {colorClass} {$$restProps?.class ??
    ''}"
>
  <span class="px-2 text-white">{title}</span>
  <NodeResizeControl
    minHeight={200}
    minWidth={200}
    position="top-right"
    style="background: none; border: none;"
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
