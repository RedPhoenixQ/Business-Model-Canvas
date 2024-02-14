<script lang="ts">
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import "@xyflow/svelte/dist/style.css";

  import ItemDetails from "$lib/ItemDetails.svelte";
  import { writable } from "svelte/store";
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    type SnapGrid,
    type Node,
    Panel,
    type XYPosition,
    getConnectedEdges,
  } from "@xyflow/svelte";
  import Item from "$lib/Item.svelte";
  import Segment from "$lib/Segment.svelte";
  import { initTheme, theme } from "$lib/theme";
  import { onMount } from "svelte";
  import ThemeSelector from "$lib/ThemeSelector.svelte";
  import FlowContextMenu from "$lib/FlowContextMenu.svelte";
  import CustomContextMenuTrigger from "$lib/CustomContextMenuTrigger.svelte";
  import { defaultTemplate } from "$lib/items";
  import StraightLineEdge from "$lib/edges/StraightLineEdge.svelte";
  import Save from "$lib/Save.svelte";

  const nodeTypes = {
    item: Item,
    segment: Segment,
  };

  const edgeTypes = {
    line: StraightLineEdge,
  };

  const nodes = writable(defaultTemplate.nodes);
  const edges = writable(defaultTemplate.edges);

  const snapGrid: SnapGrid = [25, 25];

  function hideAllEdges() {
    for (const edge of $edges) {
      edge.hidden = true;
    }
    $edges = $edges;
  }
  function showNodeEdges(node_ids: ({ id: string } | Node)[]) {
    const connected = getConnectedEdges(node_ids as Node[], $edges);
    for (const edge of connected) {
      edge.hidden = false;
    }
    $edges = $edges;
  }

  onMount(() => {
    hideAllEdges();
    const cleanupTheme = initTheme();
    return () => {
      cleanupTheme();
    };
  });

  let contextmenu_pos: XYPosition = { x: 0, y: 0 };
</script>

<ItemDetails />

<div class="h-screen bg-neutral-600">
  <CustomContextMenuTrigger
    class="absolute h-full w-full bg-red-500"
    bind:opened_at={contextmenu_pos}
  >
    <SvelteFlow
      defaultEdgeOptions={{
        type: "line",
        style: "stroke-width: 2;",
      }}
      {nodes}
      {edges}
      {snapGrid}
      {nodeTypes}
      {edgeTypes}
      fitView
      colorMode={$theme || "system"}
      on:paneclick={hideAllEdges}
      on:nodeclick={(event) => {
        console.log("on node click", event.detail.node);
        showNodeEdges([event.detail.node]);
      }}
      on:nodedragstart={(event) => {
        console.log("on node drag start", event.detail.node);
        showNodeEdges([event.detail.node]);
      }}
      on:edgeclick={(event) => {
        console.log("on edge click", event.detail.edge);
        showNodeEdges([
          { id: event.detail.edge.source },
          { id: event.detail.edge.target },
        ]);
      }}
    >
      <Panel
        position="top-left"
        class="bg-white p-2 text-black shadow-sm dark:bg-neutral-700 dark:text-white"
      >
        <h1 class="text-lg font-bold">Business Model Canvas</h1>
      </Panel>
      <Panel position="top-right">
        <ThemeSelector />
      </Panel>

      <FlowContextMenu bind:opened_at={contextmenu_pos} />

      <Controls />
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />
    </SvelteFlow>
  </CustomContextMenuTrigger>
</div>
