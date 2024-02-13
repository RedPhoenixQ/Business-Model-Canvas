<script lang="ts">
  import { NodeResizer, type NodeProps } from "@xyflow/svelte";
  import type { SegmentData } from "./layout";

  type $$Props = NodeProps<SegmentData>;
  export let id: $$Props["id"];
</script>

<div
  class="h-full w-full border-2 border-white border-opacity-25 bg-gray-700 bg-opacity-50 {$$restProps?.class ??
    ''}"
>
  <span class="px-2 text-white">{id}</span>
  <NodeResizer handleClass="pointer-events-auto" isVisible={false} />
</div>
