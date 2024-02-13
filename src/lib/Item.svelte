<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import type { Writable } from "svelte/store";
  import type { Item } from "./items";
  import ItemContextMenu from "./ItemContextMenu.svelte";
  import ItemIcon from "./ItemIcon.svelte";

  type $$Props = NodeProps<{
    item: Writable<Item>;
  }>;

  export let data: $$Props["data"];
  const { item } = data;
</script>

<ItemContextMenu {item}>
  <div class="aspect-square w-10">
    <Handle
      type="target"
      onconnect={(connections) => {
        console.log(connections);
      }}
      position={Position.Top}
    />
    <Handle
      type="source"
      onconnect={(connections) => {
        console.log(connections);
      }}
      position={Position.Bottom}
    />
    <ItemIcon src={$item.icon} alt={$item.name} />
  </div>
</ItemContextMenu>
