<script lang="ts">
  import { items, selectedItem } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import LineDrawing from "./LineDrawing.svelte";
  import AddIconDialog from "./AddIconDialog.svelte";
  import * as ContextMenu from "$lib/components/ui/context-menu";

  function handleUnselect(event: PointerEvent) {
    if (event.defaultPrevented) return;
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

<ContextMenu.Root>
  <AddIconDialog bind:openDialog></AddIconDialog>
  <ContextMenu.Trigger
    class="relative h-full w-full"
    on:pointerdown={handleUnselect}
    bind:el={areaElement}
  >
    <LineDrawing />
    {#each $items as [_key, item]}
      <ItemIcon {item} />
    {/each}
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item
      on:click={(event) => {
        console.log(event);
        // @ts-ignore: Event from ContextMenu.Item doesn't match the actual object
        handleOpenAddDialog(event.detail.originalEvent);
      }}>Add icon</ContextMenu.Item
    >
  </ContextMenu.Content>
</ContextMenu.Root>
