<script lang="ts">
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import "@xyflow/svelte/dist/style.css";

  import ItemDetails from "$lib/nodes/ItemDetails.svelte";
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
    type Edge,
  } from "@xyflow/svelte";
  import { theme } from "$lib/theme";
  import FlowContextMenu from "$lib/FlowContextMenu.svelte";
  import CustomContextMenuTrigger from "$lib/CustomContextMenuTrigger.svelte";
  import { edgeTypes } from "$lib/edges";
  import { nodeTypes } from "$lib/nodes";
  import Menubar from "$lib/menubar/Menubar.svelte";
  import AutoSave from "$lib/AutoSave.svelte";
  import PagesList from "$lib/PagesList.svelte";
  import { addHistoryEntry } from "$lib/history";

  const nodes = writable([] as Node[]);
  const edges = writable([] as Edge[]);

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

  $: console.debug("nodes", $nodes);
  $: console.debug("edges", $edges);

  let contextmenu_pos: XYPosition = { x: 0, y: 0 };
</script>

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
      {nodeTypes}
      {edgeTypes}
      fitView
      colorMode={$theme}
      ondelete={(deleted) => {
        console.log("ondelete", deleted);
        addHistoryEntry({ type: "delete", ...deleted });
      }}
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
      <Panel position="top-left" class="flex gap-2">
        <Menubar>
          <h1 class="px-2">Business Model Canvas</h1>
        </Menubar>
      </Panel>

      <PagesList />

      <FlowContextMenu bind:opened_at={contextmenu_pos} />

      <Controls />
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />

      <ItemDetails />

      <AutoSave />
    </SvelteFlow>
  </CustomContextMenuTrigger>
</div>
