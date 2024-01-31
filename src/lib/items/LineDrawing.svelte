<script lang="ts">
  import { items, selectedItem, type Item } from ".";

  let relatedBy: Item[] = [];
  $: if ($selectedItem) {
    relatedBy = [];
    for (const other of $items.values()) {
      other.relations.includes($selectedItem.id);
      relatedBy.push(other);
    }
  }
</script>

<svg
  version="1.1"
  width="100%"
  height="100%"
  xmlns="http://www.w3.org/2000/svg"
>
  {#if $selectedItem}
    {#each relatedBy as target}
      <line
        class="stroke-green-400"
        x1={$selectedItem.x}
        y1={$selectedItem.y}
        x2={target.x}
        y2={target.y}
        stroke-width="3"
      ></line>
    {/each}
    {#each $selectedItem.relations as target_id}
      {@const target = $items.get(target_id)}
      <line
        class="stroke-red-500"
        x1={$selectedItem?.x}
        y1={$selectedItem?.y}
        x2={target?.x}
        y2={target?.y}
        stroke-width="3"
      />
    {/each}
  {/if}
</svg>
