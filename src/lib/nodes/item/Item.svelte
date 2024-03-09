<script lang="ts">
  import ItemContextMenu from "./ItemContextMenu.svelte";
  import {
    Handle,
    Position,
    type NodeProps,
    NodeResizer,
    type Dimensions,
    type XYPosition,
    useConnection,
  } from "@xyflow/svelte";
  import { showItemNames, type ItemData } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import ItemDetails from "./ItemDetails.svelte";
  import { MoveIcon } from "lucide-svelte";
  import { addHistoryEntry, type HistoryEntry } from "$lib/project/history";

  type $$Props = NodeProps<ItemData>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];
  export let type: $$Props["type"];
  export let selected: $$Props["selected"];

  const connection = useConnection();

  $: isTextNode = type === "text";

  $: isConnecting = !!$connection.startHandle?.nodeId;

  let beforeResize: (HistoryEntry & { type: "resize" })["from"];
  function onResizeStart(
    _: any,
    { width, height, x, y }: Dimensions & XYPosition,
  ) {
    beforeResize = { width, height, position: { x, y } };
  }
  function onResizeEnd(
    _: any,
    { width, height, x, y }: Dimensions & XYPosition,
  ) {
    addHistoryEntry({
      type: "resize",
      id,
      from: beforeResize,
      to: { width, height, position: { x, y } },
    });
  }

  let detailsOpen = false;
</script>

<ItemContextMenu bind:data {id} on:edit={() => (detailsOpen = true)}>
  <ItemDetails bind:data {id} bind:open={detailsOpen} />
  <div class="group {isTextNode ? 'absolute inset-0 grid' : 'relative'}">
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
    {#if isTextNode}
      <NodeResizer
        minHeight={60}
        minWidth={100}
        isVisible={selected}
        {onResizeStart}
        {onResizeEnd}
      />
      <MoveIcon
        class="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100"
      />
      <div
        class="nodrag grid size-full rounded bg-background bg-opacity-75 px-1"
        style:grid-template-rows="auto 1fr"
      >
        <div class="flex min-h-[1ch] items-center">
          {#if data.icon.src}
            <ItemIcon class="size-8 p-1" icon={data.icon} alt={data.name} />
          {/if}
          <span
            class="flex-1 p-1"
            contenteditable="plaintext-only"
            bind:textContent={data.name}
          />
        </div>
        <div
          class="min-h-[1ch] p-1 text-sm"
          contenteditable="plaintext-only"
          bind:textContent={data.description}
        />
      </div>
    {:else}
      <ItemIcon
        class="size-10 ring-blue-500 [.selected_&]:ring"
        icon={data.icon}
        alt={data.name}
      />
      {#if data.name}
        <div
          class="pointer-events-none absolute -left-32 -right-32 -top-10 m-auto line-clamp-1 w-max rounded-full bg-background/75 px-2 py-1 transition-opacity {$showItemNames
            ? ''
            : 'opacity-0 group-hover:opacity-100'}"
        >
          {data.name}
        </div>
      {/if}
    {/if}
  </div>
</ItemContextMenu>
