<!-- @component
Add "group" class to a containg element to show source handle on hover
 -->
<script lang="ts">
  import { useConnection, Handle, Position } from "@xyflow/svelte";

  const connection = useConnection();

  $: isConnecting = !!$connection.startHandle?.nodeId;
</script>

{#if !isConnecting}
  <Handle
    class="opacity-0 group-hover:opacity-100"
    type="source"
    position={Position.Top}
    isConnectable={!isConnecting}
  />
{/if}
<Handle
  style="top: 0; left: 0; transform: none; width: 100%; height: 100%; opacity: 0; border-radius: unset; border: none;"
  type="target"
  position={Position.Bottom}
  isConnectable={isConnecting}
/>
