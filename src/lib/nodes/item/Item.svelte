<script lang="ts">
  import ItemContextMenu from "./ItemContextMenu.svelte";
  import { type NodeProps } from "@xyflow/svelte";
  import { showItemNames, type ItemData } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import ItemDetails from "./ItemDetails.svelte";
  import { addHistoryEntry } from "$lib/project/history";
  import ConnectionHandles from "../ConnectionHandles.svelte";

  type $$Props = NodeProps<ItemData>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

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
  <div class="group relative" title={data.name}>
    <ConnectionHandles />

    <ItemIcon
      class="size-10 ring-blue-500 [.selected_&]:ring"
      icon={data.icon}
      alt={data.name}
    />
    {#if data.name}
      <div
        class="pointer-events-none absolute -top-2 left-1/2 right-1/2 w-max max-w-40 -translate-x-1/2 -translate-y-full text-pretty rounded-lg bg-background/75 px-2 py-1 text-center transition-opacity group-hover:opacity-100 {data.showTitle ||
        $showItemNames
          ? 'opacity-75'
          : 'opacity-0'}"
      >
        {data.name}
      </div>
    {/if}
    {#if data.showText}
      <div
        class="nodrag absolute -bottom-2 left-1/2 right-1/2 grid min-h-8 min-w-24 -translate-x-1/2 translate-y-full resize overflow-auto rounded-lg"
        bind:clientWidth={data.textWidth}
        bind:clientHeight={data.textHeight}
        style:height={data.textHeight + "px"}
        style:width={data.textWidth + "px"}
        on:pointerup={() => nodeDataChange("textHeight", "textWidth")}
      >
        <textarea
          class="resize-none bg-background/75 px-2 py-1 text-sm text-foreground"
          bind:value={data.description}
          on:change={() => nodeDataChange("description")}
        />
      </div>
    {/if}
  </div>
</ItemContextMenu>
