<script lang="ts">
  import { selectedItem, type Item } from ".";

  export let item: Item;

  function handleSelect(event: PointerEvent) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    $selectedItem = item;
  }

  $: is_selected = $selectedItem === item;

  $: is_marked_as_related =
    $selectedItem?.relations?.includes(item.id) ?? false;
</script>

<div
  class="absolute aspect-square w-8 -translate-x-1/2 -translate-y-1/2 transition-transform"
  class:scale-125={is_selected}
  style="left:{item.x}px;top:{item.y}px;"
  on:pointerdown={handleSelect}
>
  {#if is_marked_as_related}
    <div
      class="absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500"
      style="width: 150%;left:50%;top:50%;"
    ></div>
  {/if}
  <img src={item.icon} alt={item.name} />
</div>
