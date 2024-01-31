<script lang="ts">
  import { items, selectedItem } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import LineDrawing from "./LineDrawing.svelte";

  function handleUnselect(event: PointerEvent) {
    if (event.defaultPrevented) return;
    $selectedItem = undefined;
  }
</script>

<div class="relative h-full w-full" on:pointerdown={handleUnselect}>
  <LineDrawing />
  {#each [...$items.values()] as item (item.id)}
    <ItemIcon {item} />
  {/each}
</div>
