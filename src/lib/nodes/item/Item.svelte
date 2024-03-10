<script lang="ts">
  import ItemContextMenu from "./ItemContextMenu.svelte";
  import {
    Handle,
    Position,
    type NodeProps,
    useConnection,
  } from "@xyflow/svelte";
  import { showItemNames, type ItemData } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import ItemDetails from "./ItemDetails.svelte";
  import { addHistoryEntry, type HistoryEntry } from "$lib/project/history";

  type $$Props = NodeProps<ItemData>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

  const connection = useConnection();

  $: isConnecting = !!$connection.startHandle?.nodeId;

  let from: ItemData = structuredClone(data);
  async function nodeDataChange(...keys: (keyof ItemData)[]) {
    console.log(from, data);
    console.log(from[keys[0]], data[keys[0]], from[keys[0]] === data[keys[0]]);
    if (keys.length > 0 && !keys.some((key) => data[key] !== from[key])) return;
    const to = structuredClone(data);
    addHistoryEntry({ type: "nodeData", id, from, to });
    from = structuredClone(data);
  }

  let detailsOpen = false;
</script>

<ItemContextMenu
  bind:data
  {id}
  on:edit={() => (detailsOpen = true)}
  on:change={(e) => nodeDataChange(e.detail)}
>
  <ItemDetails
    bind:data
    {id}
    bind:open={detailsOpen}
    on:change={(e) => nodeDataChange(e.detail)}
  />
  <div class="group relative">
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
    {#if data.showText}
      <div
        class="nodrag absolute -bottom-2 left-1/2 right-1/2 m-auto min-h-8 w-fit min-w-24 -translate-x-1/2 translate-y-full resize overflow-auto rounded-sm transition-opacity"
        bind:clientWidth={data.textWidth}
        bind:clientHeight={data.textHeight}
        style:height={data.textHeight + "px"}
        style:width={data.textWidth + "px"}
        on:pointerup={() => nodeDataChange("textHeight", "textWidth")}
      >
        <textarea
          class="absolute h-full w-full resize-none bg-background/75 p-1 text-sm text-foreground"
          bind:value={data.description}
          on:change={() => nodeDataChange("description")}
        />
      </div>
    {/if}
  </div>
</ItemContextMenu>
