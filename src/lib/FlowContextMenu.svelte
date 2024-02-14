<script lang="ts">
  import CustomContextMenuTrigger from "./CustomContextMenuTrigger.svelte";
  import * as ContextMenu from "$lib/components/ui/context-menu";
</script>

<CustomContextMenuTrigger>
  <slot />

  <ContextMenu.Content slot="content">
    <ContextMenu.Item on:click={console.debug}>Add Item</ContextMenu.Item>
  </ContextMenu.Content>
</CustomContextMenuTrigger>
