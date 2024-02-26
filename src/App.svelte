<script lang="ts">
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import "@xyflow/svelte/dist/style.css";

  import ItemDetails from "$lib/nodes/item/ItemDetails.svelte";
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
  import AutoSave from "$lib/project/AutoSave.svelte";
  import PagesList from "$lib/project/PagesList.svelte";
  import { addHistoryEntry } from "$lib/project/history";
  import Toolbar from "$lib/menubar/Toolbar.svelte";

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

  let moveNodeStartPos: XYPosition = { x: 0, y: 0 };
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
      onedgecreate={(connection) => {
        const edge = {
          ...connection,
          id: `${connection.sourceHandle ?? connection.source}-${connection.targetHandle ?? connection.target}`,
        };
        addHistoryEntry({ type: "createEdge", edge });
        return edge;
      }}
      on:paneclick={hideAllEdges}
      on:nodeclick={(event) => {
        console.log("on node click", event.detail.node);
        showNodeEdges([event.detail.node]);
      }}
      on:nodedragstart={(event) => {
        console.log("on node drag start", event.detail.node);
        showNodeEdges([event.detail.node]);
        // For node move history
        moveNodeStartPos = event.detail.node.position;
      }}
      on:nodedragstop={(event) => {
        addHistoryEntry({
          type: "move",
          id: event.detail.node.id,
          from: moveNodeStartPos,
          to: event.detail.node.position,
        });
      }}
      on:edgeclick={(event) => {
        console.log("on edge click", event.detail.edge);
        showNodeEdges([
          { id: event.detail.edge.source },
          { id: event.detail.edge.target },
        ]);
      }}
    >
      <Panel position="top-left" class="space-y-1">
        <Menubar>
          <h1 class="px-2">Business Model Canvas</h1>
        </Menubar>
        <Toolbar />
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
