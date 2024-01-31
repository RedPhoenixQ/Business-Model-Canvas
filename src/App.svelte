<script lang="ts">
  import Area from "$lib/items/Area.svelte";
  import Counter from "./lib/Counter.svelte";
</script>

<div class="flex min-h-screen flex-col bg-neutral-600 p-2">
  <h1 class="col-span-full mx-2 text-lg font-bold text-white">
    Business Model Canvas
  </h1>
  <main
    style="grid-template-columns: 2fr 1fr 2fr; grid-template-rows: 3fr 1fr;"
    class="relative grid flex-1 grid-rows-3 gap-1 [&_section]:border-2 [&_section]:border-black"
  >
    <div class="pointer-events-none absolute h-full w-full">
      <Area></Area>
    </div>
    <section class="flex flex-col bg-cyan-600">
      <h2 class="p-2 text-lg font-bold text-white">Key Partners</h2>
      <div class="grid flex-grow grid-cols-2">
        <div class="row-span-2"></div>
        <section class="bg-cyan-500">
          <h3 class="text-md p-2 font-bold text-white">Key Activites</h3>
        </section>
        <section class="bg-cyan-500">
          <h3 class="text-md p-2 font-bold text-white">Key Resources</h3>
        </section>
      </div>
    </section>

    <section class="row-span-2 flex flex-col bg-yellow-400">
      <h2 class="p-2 text-lg font-bold text-neutral-700">Value Propositions</h2>
      <div class="flex flex-grow items-center justify-center">
        <Counter />
      </div>
    </section>

    <section class="flex flex-col bg-lime-600">
      <h2 class="p-2 text-lg font-bold text-white">Customer Segments</h2>
      <div class="grid flex-grow grid-cols-2">
        <div class="row-span-2"></div>
        <section class="bg-lime-500">
          <h3 class="text-md p-2 font-bold text-white">
            Customer Relationships
          </h3>
        </section>
        <section class="bg-lime-500">
          <h3 class="text-md p-2 font-bold text-white">Channels</h3>
        </section>
      </div>
    </section>

    <section class="bg-amber-500">
      <h2 class="p-2 text-lg font-bold text-white">Cost Structure</h2>
    </section>
    <section class="bg-amber-500">
      <h2 class="p-2 text-lg font-bold text-white">Revenue Streams</h2>
    </section>
  </main>
</div>
