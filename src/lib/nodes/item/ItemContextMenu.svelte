<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import { useSvelteFlow } from "@xyflow/svelte";
  import { itemDetails, type ItemData } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import { addHistoryEntry } from "$lib/project/history";

  export let id: string;
  export let data: ItemData;

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
