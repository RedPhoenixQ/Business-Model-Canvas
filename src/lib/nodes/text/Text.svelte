<script lang="ts">
  import type { NodeProps } from "@xyflow/svelte";
  import ConnectionHandles from "../ConnectionHandles.svelte";
  import NeedsRelation from "../NeedsRelation.svelte";
  import type { TextNode } from ".";
  import { useNodeDataChange } from "..";
  import ResizeControl from "../ResizeControl.svelte";
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import TextMenu from "./TextMenu.svelte";

  type $$Props = NodeProps<TextNode>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

  const nodeDataChange = useNodeDataChange(id, data);
</script>

<ContextMenu.Root>
  <TextMenu type="context-menu" {id} />
  <ContextMenu.Trigger
    class="group h-full w-full rounded-md border-2 border-white border-opacity-25 bg-gray-700 bg-opacity-50 ring-blue-500 [.selected_&]:ring"
  >
    <ConnectionHandles />
    <NeedsRelation
      {id}
      ignoredRelations={data.ignoredRelations}
      on:ignoredChange={(e) => {
        data.ignoredRelations = e.detail;
        nodeDataChange(data, "ignoredRelations");
      }}
    />
    <ResizeControl {id} minHeight={100} minWidth={150} />

    <textarea
      class="h-full w-full resize-none rounded-md bg-background bg-opacity-75 p-2 text-foreground"
      placeholder="Text here..."
      autocomplete="off"
      on:copy|stopPropagation={() => {}}
      on:cut|stopPropagation={() => {}}
      on:paste|stopPropagation={() => {}}
      on:wheel|stopPropagation={() => {}}
      on:scroll|stopPropagation={() => {}}
      on:change={() => nodeDataChange(data, "text")}
      bind:value={data.text}
    ></textarea>
  </ContextMenu.Trigger>
</ContextMenu.Root>
