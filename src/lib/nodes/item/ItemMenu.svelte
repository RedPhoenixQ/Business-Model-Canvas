<script lang="ts">
  import { type NodeProps } from "@xyflow/svelte";
  import { type ItemData } from ".";
  import { CustomIcon } from "$lib/components/custom/icon";
  import { EditIcon } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";
  import { menu, type MenuType } from "$lib/components/custom/menu";
  import MoveMenuPart from "../MoveMenuPart.svelte";
  import DeleteNodeMenuPart from "../DeleteNodeMenuPart.svelte";
  import CopyCutMenuPart from "$lib/copyPaste/CopyCutMenuPart.svelte";

  type $$Props = Pick<NodeProps<ItemData>, "data" | "id"> & {
    type: MenuType;
  };

  export let id: $$Props["id"];
  export let data: $$Props["data"];
  export let type: $$Props["type"];

  const { Content, Item, CheckboxItem, Label, Separator, Group } = menu(type);

  const dispatch = createEventDispatcher<{
    edit: undefined;
    change: keyof ItemData;
  }>();
</script>

<Content>
  <Label class="flex items-center gap-2">
    <CustomIcon class="size-6" icon={data} alt={data.name} />
    <span class="text-center">{data.name}</span>
  </Label>
  <Separator />
  <Item class="gap-2" on:click={() => dispatch("edit")}>
    <EditIcon size={20} />
    Edit
  </Item>
  <MoveMenuPart {type} {id} />
  <Separator />
  <Group>
    <CopyCutMenuPart {type} {id} />
  </Group>
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
  <DeleteNodeMenuPart {type} {id} />
</Content>
