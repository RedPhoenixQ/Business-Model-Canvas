<script lang="ts">
  import { MoreVerticalIcon } from "lucide-svelte";
  import { type NodeProps } from "@xyflow/svelte";
  import type { GroupData } from ".";
  import GroupMenu from "./GroupMenu.svelte";
  import { Button } from "../../components/ui/button";
  import ResizeControl from "../ResizeControl.svelte";
  import ConnectionHandles from "../ConnectionHandles.svelte";

  type $$Props = NodeProps<GroupData>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];
</script>

<div
  class="group h-full w-full border-2 border-white border-opacity-25 bg-gray-700 bg-opacity-50"
>
  <ConnectionHandles />
  <div class="nodrag flex p-1">
    <input
      class="w-full overflow-ellipsis bg-transparent px-2 py-1"
      bind:value={data.name}
    />
    <GroupMenu type="dropdown-menu" let:Trigger {id}>
      <Trigger asChild let:builder>
        <Button
          variant="ghost"
          size="sm"
          class="aspect-square rounded-full p-0 hover:bg-opacity-50"
          builders={[builder]}
        >
          <MoreVerticalIcon />
        </Button>
      </Trigger>
    </GroupMenu>
  </div>
  <ResizeControl {id} minHeight={100} minWidth={150} />
</div>
