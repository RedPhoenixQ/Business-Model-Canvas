<script lang="ts">
  import { TestTubeIcon } from "lucide-svelte";
  import { Menu, type MenuTypes } from "$lib/components/custom/menu";

  export let type: MenuTypes;
</script>

<Menu {type} {...$$props} let:menu={{ Content, Item, Trigger }}>
  <slot {Trigger} />
  <Content>
    <Item on:click={console.log}>
      <TestTubeIcon size={20} class="mr-2" />
      Test
    </Item>
  </Content>
</Menu>
