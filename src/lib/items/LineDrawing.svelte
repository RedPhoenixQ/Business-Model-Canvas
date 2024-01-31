<script lang="ts">
  import { items, selectedItem } from ".";

  let line_origin = { x: 0, y: 0 };
  let line_endpoints: { x: number; y: number }[];
  $: if ($selectedItem === undefined) {
    line_endpoints = [];
  } else {
    line_origin.x = $selectedItem.x;
    line_origin.y = $selectedItem.y;
    line_endpoints = [];
    for (const related_id of $selectedItem.relations) {
      const other_item = $items.get(related_id);
      if (other_item) {
        // Pushes the whole item, which doesn't create new copies
        line_endpoints.push(other_item);
      }
    }
  }
</script>

<svg
  version="1.1"
  width="100%"
  height="100%"
  xmlns="http://www.w3.org/2000/svg"
  class="text-red-500"
>
  {#each line_endpoints as line}
    <line
      x1={line_origin.x}
      y1={line_origin.y}
      x2={line.x}
      y2={line.y}
      stroke="currentColor"
      stroke-width="3"
    ></line>
  {/each}
</svg>
