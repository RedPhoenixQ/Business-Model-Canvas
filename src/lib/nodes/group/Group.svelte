<script lang="ts">
  import { MoreVerticalIcon } from "lucide-svelte";
  import { type NodeProps } from "@xyflow/svelte";
  import type { GroupNode } from ".";
  import GroupMenu from "./GroupMenu.svelte";
  import { Button } from "../../components/ui/button";
  import ResizeControl from "../ResizeControl.svelte";
  import ConnectionHandles from "../ConnectionHandles.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import NeedsRelation from "../NeedsRelation.svelte";
  import { useNodeDataChange } from "..";

  type $$Props = NodeProps<GroupNode>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

  const nodeDataChange = useNodeDataChange(id, data);
</script>

<div
  class="group h-full w-full border-2 border-white border-opacity-25 bg-gray-700 bg-opacity-50 ring-blue-500 [.selected_&]:ring"
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

  <div class="nodrag flex p-1">
    <input
      class="w-full overflow-ellipsis bg-transparent px-2 py-1"
      bind:value={data.name}
      on:change={() => nodeDataChange(data, "name")}
    />
    <DropdownMenu.Root>
      <GroupMenu type="dropdown-menu" {id} />
      <DropdownMenu.Trigger asChild let:builder>
        <Button
          variant="ghost"
          size="sm"
          class="aspect-square rounded-full p-0 hover:bg-opacity-50"
          builders={[builder]}
        >
          <MoreVerticalIcon />
        </Button>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  </div>
  <ResizeControl {id} minHeight={100} minWidth={150} />
</div>
