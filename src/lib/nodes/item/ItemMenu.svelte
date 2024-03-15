<script lang="ts">
  import { useSvelteFlow, type NodeProps } from "@xyflow/svelte";
  import { type ItemData } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import { addHistoryEntry } from "$lib/project/history";
  import { EditIcon, XIcon } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";
  import { menu, type MenuType } from "$lib/components/custom/menu";

  type $$Props = Pick<NodeProps<ItemData>, "data" | "id"> & {
    type: MenuType;
  };

  export let id: $$Props["id"];
  export let data: $$Props["data"];
  export let type: $$Props["type"];

  const { Content, Item, CheckboxItem, Label, Separator } = menu(type);

  const dispatch = createEventDispatcher<{
    edit: undefined;
    change: keyof ItemData;
  }>();

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

<Content>
  <Label class="flex items-center gap-2">
    <ItemIcon class="size-6" icon={data.icon} alt={data.name} />
    <span class="text-center">{data.name}</span>
  </Label>
  <Separator />
  <Item on:click={() => dispatch("edit")}>
    <EditIcon class="mr-2" size={20} />
    Edit
  </Item>
  <Separator />
  <CheckboxItem
    bind:checked={data.showTitle}
    onCheckedChange={() => {
      // Make sure data object is updated before sending "change" by adding delay
      setTimeout(() => dispatch("change", "showTitle"));
    }}
  >
    Always show title
  </CheckboxItem>
  <CheckboxItem
    bind:checked={data.showText}
    onCheckedChange={() => {
      // Make sure data object is updated before sending "change" by adding delay
      setTimeout(() => dispatch("change", "showText"));
    }}
  >
    Show text
  </CheckboxItem>
  <Separator />
  <Item
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
  </Item>
</Content>
