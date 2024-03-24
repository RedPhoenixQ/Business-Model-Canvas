<script lang="ts">
  import { useSvelteFlow } from "@xyflow/svelte";
  import { addHistoryEntry } from "$lib/project/history";
  import { XIcon } from "lucide-svelte";
  import { menu, type MenuType } from "$lib/components/custom/menu";

  export let type: MenuType;
  export let id: string;

  const { Item } = menu(type);

  const { deleteElements } = useSvelteFlow();
</script>

<Item
  class="text-destructive data-[highlighted]:bg-destructive data-[highlighted]:text-destructive-foreground"
  on:click={async () => {
    const deleted = await deleteElements({ nodes: [{ id }] });
    console.debug("deleting node", id, deleted);
    addHistoryEntry({
      type: "delete",
      nodes: deleted.deletedNodes,
      edges: deleted.deletedEdges,
    });
  }}
>
  <XIcon class="mr-2" size="20" />
  Delete
</Item>
