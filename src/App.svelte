<script lang="ts">
  import Counter from "./lib/Counter.svelte";
</script>

<main
  class="grid grid-cols-5 grid-rows-4 gap-1 [&>div]:border-2 [&>div]:border-black"
>
  <h1 class="col-span-full text-lg">Business Model Canvas</h1>

  <div class="col-start-1 row-span-2 bg-cyan-600"></div>
  <div class="col-start-2 bg-cyan-500"></div>
  <div class="col-start-2 row-start-3 bg-cyan-500"></div>

  <div
    class="col-start-3 row-span-3 row-start-2 flex items-center justify-center bg-yellow-400"
  >
    <Counter />
  </div>

  <div class="col-start-4 bg-lime-500"></div>
  <div class="col-start-4 row-start-3 bg-lime-500"></div>
  <div class="col-start-5 row-span-2 bg-lime-600"></div>

  <div class="col-span-2 bg-amber-500"></div>
  <div class="col-span-2 bg-amber-500"></div>
</main>
