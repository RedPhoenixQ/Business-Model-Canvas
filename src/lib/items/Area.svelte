<script lang="ts">
  import { items, selectedItem } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import LineDrawing from "./LineDrawing.svelte";
  import AddIconDialog from "./AddIconDialog.svelte";

  function handleUnselect(event: PointerEvent) {
    if (event.defaultPrevented || event.button !== 0) return;
    $selectedItem = undefined;
  }

  let areaElement: HTMLDivElement;
  let openDialog: (x?: number, y?: number) => void;
  function handleOpenAddDialog(event: MouseEvent) {
    let boundingBox = areaElement.getBoundingClientRect();
    let x = event.pageX - boundingBox.left;
    let y = event.pageY - boundingBox.top;
    openDialog(x, y);
  }
</script>

<AddIconDialog bind:openDialog></AddIconDialog>
<div
  class="relative h-full w-full"
  on:pointerdown={handleUnselect}
  bind:this={areaElement}
>
  <LineDrawing />
  {#each $items as [_key, item]}
    <ItemIcon {item} />
  {/each}
</div>
