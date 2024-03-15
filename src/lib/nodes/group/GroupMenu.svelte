<script lang="ts">
  import { TestTubeIcon } from "lucide-svelte";
  import { menu, type MenuType } from "$lib/components/custom/menu";

  export let type: MenuType;

  const { Content, Item } = menu(type);
</script>

<Content {...$$restProps}>
  <Item on:click={console.log}>
    <TestTubeIcon size={20} class="mr-2" />
    Test
  </Item>
</Content>
