<script lang="ts">
  import { menu, type MenuType } from "$lib/components/custom/menu";
  import MoveMenuPart from "../MoveMenuPart.svelte";
  import DeleteNodeMenuPart from "../DeleteNodeMenuPart.svelte";
  import CopyCutMenuPart from "$lib/copyPaste/CopyCutMenuPart.svelte";

  export let type: MenuType;
  export let id: string;

  const { Content, Separator, Group } = menu(type);
</script>

<Content {...$$restProps}>
  <Group>
    <CopyCutMenuPart {type} {id} />
  </Group>
  <Separator />
  <MoveMenuPart {type} {id} />
  <Separator />
  <DeleteNodeMenuPart {type} {id} />
</Content>
