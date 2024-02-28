<script lang="ts">
  import ItemContextMenu from "./ItemContextMenu.svelte";
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import type { ItemData } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import ItemDetails from "./ItemDetails.svelte";

  type $$Props = NodeProps<ItemData>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];
  export let selected: $$Props["selected"];

  let detailsOpen = false;
</script>

<ItemContextMenu bind:data {id} on:edit={() => (detailsOpen = true)}>
  <ItemDetails bind:data {id} bind:open={detailsOpen} />
  <div class="group relative aspect-square w-10 {selected ? 'scale-125' : ''}">
    <Handle type="source" position={Position.Top} />
    <Handle
      style="top: 0; left: 0; transform: none; width: 100%; height: 100%; visibility: hidden;"
      type="target"
      position={Position.Top}
    />
    <ItemIcon icon={data.icon} alt={data.name} />
    <div
      class="absolute -left-32 -right-32 -top-10 m-auto line-clamp-1 w-max rounded-full bg-background/75 px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100"
    >
      {data.name}
    </div>
  </div>
</ItemContextMenu>
