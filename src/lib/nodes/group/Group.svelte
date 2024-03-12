<script lang="ts">
  import { NodeResizeControl, type NodeProps } from "@xyflow/svelte";
  import type { GroupData } from ".";
  import ResizeIcon from "../segment/ResizeIcon.svelte";

  type $$Props = NodeProps<GroupData>;

  export let data: $$Props["data"];
</script>

<div
  class="h-full w-full border-2 border-white border-opacity-25 bg-gray-700 bg-opacity-50"
>
  <input
    class="w-full overflow-ellipsis bg-transparent px-2 py-1"
    bind:value={data.title}
  />
  <NodeResizeControl
    position="bottom-right"
    style="background: none; border: none;"
  >
    <ResizeIcon
      class="pointer-events-auto -translate-x-full -translate-y-full opacity-50 transition-opacity hover:opacity-100"
    />
  </NodeResizeControl>
</div>
