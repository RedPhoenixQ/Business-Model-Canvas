<script lang="ts">
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import "@xyflow/svelte/dist/style.css";

  import { writable } from "svelte/store";
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    type Node,
    Panel,
    type XYPosition,
    getConnectedEdges,
    type Edge,
    ControlButton,
    ConnectionLineType,
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
  import { showItemNames } from "$lib/nodes/item";
  import { EyeIcon, EyeOffIcon } from "lucide-svelte";

  const nodes = writable([] as Node[]);
  const edges = writable([] as Edge[]);

  const nodeEdgesToShow: Set<string> = new Set();
  function hideAllEdges() {
    nodeEdgesToShow.clear();
    for (const edge of $edges) {
      edge.hidden = true;
    }
    $edges = $edges;
  }
  function toggleNodeEdgeHidden(
    nodeList: ({ id: string } | Node)[],
    hidden = false,
  ) {
    const connected = getConnectedEdges(nodeList as Node[], $edges);
    for (const edge of connected) {
      if (
        hidden &&
        (nodeEdgesToShow.has(edge.source) || nodeEdgesToShow.has(edge.target))
      ) {
        continue;
      }
      edge.hidden = hidden;
    }
    $edges = $edges;
  }

  $: console.debug("nodes", $nodes);
  $: console.debug("edges", $edges);

  let moveNodeStartPos: XYPosition = { x: 0, y: 0 };
  let contextmenuPos: XYPosition = { x: 0, y: 0 };
</script>

<div
  class="h-screen bg-neutral-600"
  on:selectstart={(event) => {
    // This prevents wierd selection in textareas when selecting nodes
    event.preventDefault();
  }}
>
  <CustomContextMenuTrigger
    class="absolute h-full w-full bg-red-500"
    bind:opened_at={contextmenuPos}
  >
    <SvelteFlow
      defaultEdgeOptions={{
        type: "line",
        style: "stroke-width: 2;",
      }}
      connectionRadius={0}
      connectionLineStyle="stroke-width: 2;"
      connectionLineType={ConnectionLineType.Straight}
      {nodes}
      {edges}
      {nodeTypes}
      {edgeTypes}
      fitView
      colorMode={$theme}
      ondelete={(deleted) => {
        console.debug("ondelete", deleted);
        addHistoryEntry({ type: "delete", ...deleted });
      }}
      onedgecreate={(connection) => {
        console.debug("onedgecreate", connection);
        const edge = {
          ...connection,
          id: `${connection.sourceHandle ?? connection.source}-${connection.targetHandle ?? connection.target}`,
        };
        addHistoryEntry({ type: "createEdge", edge });
        return edge;
      }}
      on:paneclick={hideAllEdges}
      on:nodeclick={(event) => {
        console.debug("on node click", event.detail.node);
        nodeEdgesToShow.add(event.detail.node.id);
        toggleNodeEdgeHidden([event.detail.node]);
      }}
      on:nodemouseenter={(event) => {
        console.debug("on node enter", event.detail.node);
        toggleNodeEdgeHidden([event.detail.node]);
      }}
      on:nodemouseleave={(event) => {
        console.debug("on node leave", event.detail.node);
        toggleNodeEdgeHidden([event.detail.node], true);
      }}
      on:nodedragstart={(event) => {
        console.debug("on node drag start", event.detail.node);
        toggleNodeEdgeHidden([event.detail.node]);
        // For node move history
        moveNodeStartPos = event.detail.node.position;
      }}
      on:nodedragstop={(event) => {
        console.debug("on node drag stop", event.detail.node);
        addHistoryEntry({
          type: "move",
          id: event.detail.node.id,
          from: moveNodeStartPos,
          to: event.detail.node.position,
        });
      }}
      on:edgeclick={(event) => {
        console.debug("on edge click", event.detail.edge);
        toggleNodeEdgeHidden([
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

      <PagesList on:pageSwap={() => nodeEdgesToShow.clear()} />

      <FlowContextMenu bind:opened_at={contextmenuPos} />

      <Controls>
        <ControlButton
          title="toggle always show names"
          aria-label="toggle always show names"
          on:click={() => ($showItemNames = !$showItemNames)}
        >
          {#if $showItemNames}
            <EyeIcon class="!fill-transparent" />
          {:else}
            <EyeOffIcon class="!fill-transparent" />
          {/if}
        </ControlButton>
      </Controls>
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />

      <AutoSave />

      <div id="itemDetailsPortal" />
    </SvelteFlow>
  </CustomContextMenuTrigger>
</div>
