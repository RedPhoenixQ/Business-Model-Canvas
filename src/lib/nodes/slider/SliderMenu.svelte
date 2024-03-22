<script lang="ts">
  import { menu, type MenuType } from "$lib/components/custom/menu";
  import MoveMenuPart from "../MoveMenuPart.svelte";
  import DeleteNodeMenuPart from "../DeleteNodeMenuPart.svelte";

  export let type: MenuType;
  export let id: string;

  const { Content, Separator } = menu(type);
</script>

<Content {...$$restProps}>
  <MoveMenuPart {type} {id} />
  <Separator />
  <DeleteNodeMenuPart {type} {id} />
</Content>
