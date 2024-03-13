<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { type ContextMenuProps, type DropdownMenuProps } from "bits-ui";
  import { getContext, setContext } from "svelte";
  import type { MenuTypes } from ".";

  type $$Props = (ContextMenuProps | DropdownMenuProps) & {
    type: MenuTypes;
  };

  export let type: $$Props["type"];
  export let open: $$Props["open"] = undefined;

  const { Root, ...menu } =
    type === "context-menu" ? ContextMenu : DropdownMenu;

  function close() {
    open = false;
  }
  let menuSet: Set<() => void> = getContext("custom-menu-menuSet");
  if (menuSet) {
    menuSet.add(close);
  } else {
    menuSet = new Set([close]);
    setContext("custom-menu-menuSet", menuSet);
  }

  $: {
    open;
    menuSet.forEach((menu) => {
      if (menu !== close) menu();
    });
  }
</script>

<Root bind:open {...$$props}>
  <slot {menu} />
</Root>
