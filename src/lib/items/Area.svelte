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
  {#each $items as [_key, item]}
    <ItemIcon {item} />
  {/each}
</div>
