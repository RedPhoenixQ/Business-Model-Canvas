<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import NoIcon from "../assets/no-icon.svg";
  import type { Writable } from "svelte/store";
  import type { Item } from "./items";
  import ItemContextMenu from "./ItemContextMenu.svelte";

  type $$Props = NodeProps<{
    item: Writable<Item>;
  }>;

  export let data: $$Props["data"];
  const { item } = data;
  $: icon = $item.icon || NoIcon;
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
    {#if $item.icon}
      <!-- content here -->
      <img src={icon} alt={$item.name} />
    {:else}
      <svg
        class="aspect-square w-10 stroke-black dark:stroke-white"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke-width="8">
          <ellipse ry="40" rx="40" cy="50" cx="50" fill="none" />
          <line
            transform="rotate(-45 51.5 50.5)"
            y2="12"
            x2="51"
            y1="89"
            x1="52"
          />
        </g>
      </svg>
      <!-- else content here -->
    {/if}
  </div>
</ItemContextMenu>
