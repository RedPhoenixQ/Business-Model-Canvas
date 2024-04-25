<script lang="ts">
  import { type NodeProps } from "@xyflow/svelte";
  import { type TextNode } from ".";
  import { menu, type MenuType } from "$lib/components/custom/menu";
  import MoveMenuPart from "../MoveMenuPart.svelte";
  import DeleteNodeMenuPart from "../DeleteNodeMenuPart.svelte";
  import CopyCutMenuPart from "$lib/copyPaste/CopyCutMenuPart.svelte";

  type $$Props = Pick<NodeProps<TextNode>, "id"> & {
    type: MenuType;
  };

  export let id: $$Props["id"];
  export let type: $$Props["type"];

  const { Content, Separator, Group } = menu(type);
</script>

<Content>
  <MoveMenuPart {type} {id} />
  <Separator />
  <Group>
    <CopyCutMenuPart {type} {id} />
  </Group>
  <Separator />
  <DeleteNodeMenuPart {type} {id} />
</Content>
