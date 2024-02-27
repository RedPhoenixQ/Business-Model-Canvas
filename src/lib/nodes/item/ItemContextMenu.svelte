<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import { useSvelteFlow, type NodeProps } from "@xyflow/svelte";
  import { itemDetails, type ItemData } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import { addHistoryEntry } from "$lib/project/history";
  import CustomContextMenuTrigger from "$lib/CustomContextMenuTrigger.svelte";

  type $$Props = Pick<NodeProps<ItemData>, "data" | "id">;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

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
  <ContextMenu.Content>
    <ContextMenu.Label class="flex items-center gap-2">
      <div class="w-6">
        <ItemIcon icon={data.icon} alt={data.name} />
      </div>
      <span class="text-center">{data.name}</span>
    </ContextMenu.Label>
    <ContextMenu.Separator />
    <ContextMenu.Item on:click={() => ($itemDetails = { id, data })}>
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
      }}>Delete</ContextMenu.Item
    >
  </ContextMenu.Content>
</CustomContextMenuTrigger>
