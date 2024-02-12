<script lang="ts">
  import { type Item, selectedItem, itemDetails } from ".";
  import { movable } from "$lib/actions/movable";
  import NoIcon from "../../assets/no-icon.svg";
  import * as ContextMenu from "$lib/components/ui/context-menu";

  export let item: Item;

  function handleSelect(event: PointerEvent) {
    if (event.defaultPrevented || event.button !== 0 || $selectedItem === item)
      return;
    event.preventDefault();
    if ($selectedItem) {
      // Toggle relation to the selected item
      let i = $selectedItem.relations.findIndex((id) => id === item.id);
      if (i >= 0) {
        $selectedItem.relations.splice(i);
      } else {
        $selectedItem.relations.push(item.id);
      }
      $selectedItem.relations = $selectedItem.relations;
    } else {
      $selectedItem = item;
    }
  }

  $: is_selected = $selectedItem === item;

  // Use fallback icon
  $: icon = item.icon || NoIcon;
  console.log(icon);
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div
      class="absolute aspect-square w-8 -translate-x-1/2 -translate-y-1/2 transition-transform"
      class:scale-125={is_selected}
      style="left:{item.x}px;top:{item.y}px;"
      on:pointerdown={handleSelect}
      use:movable={{
        pos: item,
        enabled: !$selectedItem || $selectedItem === item,
      }}
      on:moving={({ detail }) => {
        item.x = detail.x;
        item.y = detail.y;
        $selectedItem = item;
      }}
    >
      {#if is_selected}
        <div
          class="absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500"
          style="width: 150%;left:50%;top:50%;"
        ></div>
      {/if}
      <img src={icon} alt={item.name} />
    </div>
  </ContextMenu.Trigger>

  <ContextMenu.Content>
    <ContextMenu.Item
      on:click={() => {
        $itemDetails = item.id;
      }}>Edit</ContextMenu.Item
    >
  </ContextMenu.Content>
</ContextMenu.Root>
