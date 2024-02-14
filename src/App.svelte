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
  function showNodeEdges(node_ids: string[], depth = 2) {
    const idsToShow: string[] = [];
    for (let i = 0; i < depth; i++) {
      let next_node_list = [];
      for (const edge of $edges) {
        if (idsToShow.includes(edge.id)) continue;
        const includesSource = node_ids.includes(edge.source);
        const includesTarget = node_ids.includes(edge.target);
        edge.hidden = !includesSource && !includesTarget;
        if (!edge.hidden) {
          idsToShow.push(edge.id);
          next_node_list.push(includesSource ? edge.target : edge.source);
        }
      }
      node_ids = next_node_list;
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
    <Panel
      position="top-left"
      class="bg-white p-2 text-black shadow-sm dark:bg-neutral-700 dark:text-white"
    >
      <h1 class="text-lg font-bold">Business Model Canvas</h1>
    </Panel>
    <Panel position="top-right">
      <ThemeSelector />
    </Panel>
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
        showNodeEdges([event.detail.node.id]);
      }}
      on:nodedragstart={(event) => {
        console.log("on node drag start", event.detail.node);
        showNodeEdges([event.detail.node.id]);
      }}
      on:edgeclick={(event) => {
        console.log("on edge click", event.detail.edge);
        showNodeEdges([event.detail.edge.source, event.detail.edge.target]);
      }}
    >
      <FlowContextMenu bind:opened_at={contextmenu_pos} />

      <Controls />
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />
    </SvelteFlow>
  </CustomContextMenuTrigger>
</div>
