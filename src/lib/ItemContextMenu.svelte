<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import type { Writable } from "svelte/store";
  import { itemDetails, type Item } from "./items";
  import CustomContextMenuTrigger from "./CustomContextMenuTrigger.svelte";

  export let item: Writable<Item>;
</script>

<CustomContextMenuTrigger>
  <slot />

  <ContextMenu.Content>
    <ContextMenu.Item
      on:click={() => {
        $itemDetails = item;
      }}>Edit</ContextMenu.Item
    >
  </ContextMenu.Content>
</CustomContextMenuTrigger>
