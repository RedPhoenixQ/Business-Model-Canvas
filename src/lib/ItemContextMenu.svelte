<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import type { Writable } from "svelte/store";
  import { itemDetails, type Item } from "./items";

  export let item: Writable<Item>;
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <slot />
  </ContextMenu.Trigger>

  <ContextMenu.Content>
    <ContextMenu.Item
      on:click={() => {
        $itemDetails = item;
      }}>Edit</ContextMenu.Item
    >
  </ContextMenu.Content>
</ContextMenu.Root>
