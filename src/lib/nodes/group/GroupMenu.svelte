<script lang="ts">
  import { TestTubeIcon } from "lucide-svelte";
  import { menu, type MenuType } from "$lib/components/custom/menu";
  import MoveMenuPart from "../MoveMenuPart.svelte";

  export let type: MenuType;
  export let id: string;

  const { Content, Item } = menu(type);
</script>

<Content {...$$restProps}>
  <MoveMenuPart {type} {id} />
  <Item on:click={console.log}>
    <TestTubeIcon size={20} class="mr-2" />
    Test
  </Item>
</Content>
