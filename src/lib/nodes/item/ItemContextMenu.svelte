<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import { useSvelteFlow, type NodeProps } from "@xyflow/svelte";
  import { type ItemData } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import { addHistoryEntry } from "$lib/project/history";
  import CustomContextMenuTrigger from "$lib/CustomContextMenuTrigger.svelte";
  import { EditIcon, XIcon } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";

  type $$Props = Pick<NodeProps<ItemData>, "data" | "id">;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

  const dispatch = createEventDispatcher<{ edit: undefined }>();

  const { deleteElements } = useSvelteFlow();

  async function deleteNode(id: string) {
    const deleted = await deleteElements({ nodes: [{ id }] });
    addHistoryEntry({
      type: "delete",
      nodes: deleted.deletedNodes,
      edges: deleted.deletedEdges,
    });
  }
</script>

<CustomContextMenuTrigger>
  <slot />
  <ContextMenu.Content class="[&_[role=menuitem]]:gap-2">
    <ContextMenu.Label class="flex items-center gap-2">
      <div class="w-6">
        <ItemIcon icon={data.icon} alt={data.name} />
      </div>
      <span class="text-center">{data.name}</span>
    </ContextMenu.Label>
    <ContextMenu.Separator />
    <ContextMenu.Item on:click={() => dispatch("edit")}>
      <EditIcon size={20} />
      Edit
    </ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item
      class="text-destructive data-[highlighted]:bg-destructive data-[highlighted]:text-destructive-foreground"
      on:click={() => {
        if (confirm("Are you sure?")) {
          console.log("deleting node", id, data);
          deleteNode(id);
        }
      }}
    >
      <XIcon size="20" />
      Delete
    </ContextMenu.Item>
  </ContextMenu.Content>
</CustomContextMenuTrigger>
