<script lang="ts">
  import ItemContextMenu from "./ItemContextMenu.svelte";
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import type { ItemData } from ".";
  import ItemIcon from "./ItemIcon.svelte";

  type $$Props = NodeProps<ItemData>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];
  export let selected: $$Props["selected"];
</script>

<ItemContextMenu bind:data {id}>
  <div class="relative aspect-square w-10 {selected ? 'scale-125' : ''}">
    <Handle type="source" position={Position.Top} />
    <Handle
      style="top: 0; left: 0; transform: none; width: 100%; height: 100%; visibility: hidden;"
      type="target"
      position={Position.Top}
    />
    <ItemIcon icon={data.icon} alt={data.name} />
  </div>
</ItemContextMenu>
