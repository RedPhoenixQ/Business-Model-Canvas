<script lang="ts">
  import ItemMenu from "./ItemMenu.svelte";
  import { type NodeProps } from "@xyflow/svelte";
  import { type ItemNode } from ".";
  import { CustomIcon } from "$lib/components/custom/icon";
  import ItemDetails from "./ItemDetails.svelte";
  import ConnectionHandles from "../ConnectionHandles.svelte";
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import { pageStore } from "$lib/project";
  import NeedsRelation from "../NeedsRelation.svelte";
  import { useNodeDataChange } from "..";

  type $$Props = NodeProps<ItemNode>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

  const nodeDataChange = useNodeDataChange(id, data);

  let detailsOpen = false;
</script>

<ContextMenu.Root>
  <ItemMenu
    type="context-menu"
    bind:data
    {id}
    on:edit={() => (detailsOpen = true)}
    on:change={(e) => nodeDataChange(data, e.detail)}
  />
  <ItemDetails
    bind:data
    {id}
    bind:open={detailsOpen}
    on:change={(e) => nodeDataChange(data, e.detail)}
  />
  <ContextMenu.Trigger class="group relative" title={data.name}>
    <ConnectionHandles />
    <NeedsRelation
      {id}
      ignoredRelations={data.ignoredRelations}
      on:ignoredChange={(e) => {
        data.ignoredRelations = e.detail;
        nodeDataChange(data, "ignoredRelations");
      }}
    />

    <CustomIcon
      class="size-10 ring-blue-500 [.selected_&]:ring"
      icon={data.icon}
      alt={data.name}
    />
    {#if data.name}
      <div
        class="pointer-events-none absolute -top-2 left-1/2 right-1/2 w-max max-w-40 -translate-x-1/2 -translate-y-full text-pretty rounded-lg bg-background/75 px-2 py-1 text-center transition-opacity group-hover:opacity-100 {data.showTitle ||
        $pageStore.showItemNames
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
        on:pointerup={() => nodeDataChange(data, "textHeight", "textWidth")}
      >
        <textarea
          class="resize-none bg-background/75 px-2 py-1 text-sm text-foreground"
          bind:value={data.description}
          on:change={() => nodeDataChange(data, "description")}
        />
      </div>
    {/if}
  </ContextMenu.Trigger>
</ContextMenu.Root>
