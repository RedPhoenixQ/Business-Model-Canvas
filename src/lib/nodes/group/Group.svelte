<script lang="ts">
  import { MoreVerticalIcon } from "lucide-svelte";
  import {
    NodeResizeControl,
    type NodeProps,
    useSvelteFlow,
  } from "@xyflow/svelte";
  import type { GroupData } from ".";
  import ResizeIcon from "../segment/ResizeIcon.svelte";
  import GroupMenu from "./GroupMenu.svelte";
  import { Button } from "../../components/ui/button";

  type $$Props = NodeProps<GroupData>;

  const { getNode } = useSvelteFlow();
  /** The minimum distance from a node parent */
  const resizePadding = 5;

  export let id: $$Props["id"];
  export let data: $$Props["data"];
</script>

<div
  class="h-full w-full border-2 border-white border-opacity-25 bg-gray-700 bg-opacity-50"
>
  <div class="flex p-1">
    <input
      class="nodrag w-full overflow-ellipsis bg-transparent px-2 py-1"
      bind:value={data.title}
    />
    <GroupMenu type="dropdown-menu" let:Trigger {id}>
      <Trigger asChild let:builder>
        <Button
          variant="ghost"
          size="sm"
          class="aspect-square rounded-full p-0 hover:bg-opacity-50"
          builders={[builder]}
          on:click={(event) => {
            console.log(event);
            event.stopPropagation();
          }}
        >
          <MoreVerticalIcon />
        </Button>
      </Trigger>
    </GroupMenu>
  </div>
  <NodeResizeControl
    position="bottom-right"
    style="background: none; border: none;"
    shouldResize={(_, { direction, width, height, x, y }) => {
      const node = getNode(id);
      if (!node?.parentNode) return true;
      const parent = getNode(node?.parentNode);
      if (
        typeof parent?.width !== "number" ||
        typeof parent?.height !== "number"
      )
        return true;
      if (
        (direction[0] !== 0 &&
          parent.width - resizePadding < resizePadding + x + width) ||
        (direction[1] !== 0 &&
          parent.height - resizePadding < resizePadding + y + height)
      ) {
        return false;
      }
      return true;
    }}
  >
    <ResizeIcon
      class="pointer-events-auto -translate-x-full -translate-y-full opacity-50 transition-opacity hover:opacity-100"
    />
  </NodeResizeControl>
</div>
