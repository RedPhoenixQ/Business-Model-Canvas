<script lang="ts">
  import { TestTubeIcon } from "lucide-svelte";
  import { Menu, type MenuTypes } from "$lib/components/custom/menu";
  import type { ContextMenuProps, DropdownMenuProps } from "bits-ui";

  type $$Props = (ContextMenuProps | DropdownMenuProps) & {
    type: MenuTypes;
    asChild?: boolean;
  };

  export let type: MenuTypes;
  export let asChild: $$Props["asChild"] = undefined;
</script>

<Menu {type} {...$$props} let:menu={{ Content, Item, Trigger }}>
  <Trigger {asChild} let:builder>
    <slot {builder} />
  </Trigger>
  <Content>
    <Item on:click={console.log}>
      <TestTubeIcon size={20} class="mr-2" />
      Test
    </Item>
  </Content>
</Menu>
