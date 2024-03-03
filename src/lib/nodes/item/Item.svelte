<script lang="ts">
  import ItemContextMenu from "./ItemContextMenu.svelte";
  import {
    Handle,
    Position,
    type NodeProps,
    NodeResizer,
  } from "@xyflow/svelte";
  import type { ItemData } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import ItemDetails from "./ItemDetails.svelte";
  import { MoveIcon } from "lucide-svelte";

  type $$Props = NodeProps<ItemData>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];
  export let selected: $$Props["selected"];

  $: isTextNode = !!data.description;

  let detailsOpen = false;
</script>

<ItemContextMenu bind:data {id} on:edit={() => (detailsOpen = true)}>
  <ItemDetails bind:data {id} bind:open={detailsOpen} />
  <div class="group {isTextNode ? 'absolute inset-0 grid' : 'relative'}">
    <Handle type="source" position={Position.Top} />
    <Handle
      style="top: 0; left: 0; transform: none; width: 100%; height: 100%; visibility: hidden;"
      type="target"
      position={Position.Top}
    />
    {#if isTextNode}
      <NodeResizer isVisible={selected} />
      <MoveIcon
        class="absolute right-0 top-0 -translate-y-full translate-x-full {selected
          ? 'opacity-100'
          : 'opacity-0'}"
      />
      <div
        class="nodrag size-full overflow-y-auto rounded bg-background bg-opacity-75 px-1"
      >
        <div class="flex items-center">
          {#if data.icon.src}
            <div class="size-8 p-1">
              <ItemIcon icon={data.icon} alt={data.name} />
            </div>
          {/if}
          <span
            class="flex-1 p-1"
            contenteditable="plaintext-only"
            bind:textContent={data.name}
          />
        </div>
        <div
          class="p-1 text-sm"
          contenteditable="plaintext-only"
          bind:textContent={data.description}
        />
      </div>
    {:else}
      <div class="size-10 {selected ? 'scale-125' : ''}">
        <ItemIcon icon={data.icon} alt={data.name} />
      </div>
      {#if data.name}
        <div
          class="absolute -left-32 -right-32 -top-10 m-auto line-clamp-1 w-max rounded-full bg-background/75 px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100"
        >
          {data.name}
        </div>
      {/if}
    {/if}
  </div>
</ItemContextMenu>
