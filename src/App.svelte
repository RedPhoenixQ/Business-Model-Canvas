<script lang="ts">
  import Flow from "$lib/Flow.svelte";
  import ItemDetails from "$lib/ItemDetails.svelte";
</script>

<ItemDetails />

<div class="flex min-h-screen flex-col bg-neutral-600 p-2">
  <h1 class="col-span-full mx-2 text-lg font-bold text-white">
    Business Model Canvas
  </h1>
  <Flow />
</div>
