<script lang="ts">
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import "@xyflow/svelte/dist/style.css";

  import { writable } from "svelte/store";
  import {
    SvelteFlow,
    Background,
    BackgroundVariant,
    MiniMap,
    type Node,
    Panel,
    type XYPosition,
    getConnectedEdges,
    type Edge,
    ConnectionLineType,
  } from "@xyflow/svelte";
  import { theme } from "$lib/theme";
  import FlowMenu from "$lib/FlowMenu.svelte";
  import FlowControls from "./lib/FlowControls.svelte";
  import { edgeTypes } from "$lib/edges";
  import { nodeTypes } from "$lib/nodes";
  import Menubar from "$lib/menubar/Menubar.svelte";
  import AutoSave from "$lib/project/AutoSave.svelte";
  import PagesList from "$lib/project/PagesList.svelte";
  import { addHistoryEntry } from "$lib/project/history";
  import Toolbar from "$lib/menubar/Toolbar.svelte";
  import ProjectName from "$lib/project/ProjectName.svelte";
  import MoveHandler from "$lib/nodes/MoveHandler.svelte";
  import * as ContextMenu from "$lib/components/ui/context-menu";

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
  let contextmenuOpen = false;
  let onMove: (node: Node, old_pos: XYPosition) => void;
</script>

<div
  class="h-screen bg-neutral-600"
  on:selectstart={(event) => {
    // This prevents wierd selection in textareas when selecting nodes
    event.preventDefault();
  }}
>
  <ContextMenu.Root bind:open={contextmenuOpen}>
    <ContextMenu.Trigger
      class="absolute h-full w-full"
      on:contextmenu={(event) => {
        contextmenuPos.x = event.detail.originalEvent.clientX;
        contextmenuPos.y = event.detail.originalEvent.clientY;
      }}
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
            id: `${connection.sourceHandle ?? connection.source}-${
              connection.targetHandle ?? connection.target
            }`,
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
          onMove(event.detail.node, moveNodeStartPos);
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
          <div class="flex gap-2">
            <ProjectName />
            <Toolbar />
          </div>
          <Menubar />
        </Panel>

        <PagesList on:pageSwap={() => nodeEdgesToShow.clear()} />

        <FlowMenu
          type="context-menu"
          bind:createPos={contextmenuPos}
          on:close={() => (contextmenuOpen = false)}
        />

        <FlowControls />
        <Background variant={BackgroundVariant.Dots} />
        <MiniMap />

        <AutoSave />
        <MoveHandler bind:onMove />

        <div id="itemDetailsPortal" />
      </SvelteFlow>
    </ContextMenu.Trigger>
  </ContextMenu.Root>
</div>
