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
    useSvelteFlow,
    useNodes,
  } from "@xyflow/svelte";
  import { theme } from "$lib/theme";
  import AddItemMenuPart from "$lib/AddItemMenuPart.svelte";
  import FlowControls from "./lib/FlowControls.svelte";
  import { edgeTypes } from "$lib/edges";
  import { findChildNodes, nodeTypes } from "$lib/nodes";
  import Menubar from "$lib/menubar/Menubar.svelte";
  import AutoSave from "$lib/project/AutoSave.svelte";
  import PagesList from "$lib/project/PagesList.svelte";
  import { addHistoryEntry } from "$lib/project/history";
  import Toolbar from "$lib/menubar/Toolbar.svelte";
  import ProjectName from "$lib/project/ProjectName.svelte";
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import { findFirstParentAndRelativePos } from "$lib/info/nodes";
  import PasteItemMenuPart from "$lib/copyPaste/PasteItemMenuPart.svelte";
  import CopyPasteShortcutHandler from "$lib/copyPaste/CopyPasteShortcutHandler.svelte";
  import SgaLogo from "$lib/icons/SGALogo.svelte";
  import FileDropHandler from "$lib/project/FileDropHandler.svelte";

  const nodes = writable([] as Node[]);
  const edges = writable([] as Edge[]);

  const { getIntersectingNodes, updateNode, deleteElements } = useSvelteFlow();

  useNodes().setOptions({ elevateNodesOnSelect: false });

  let moveNodeStartPos: XYPosition = { x: 0, y: 0 };
  /**
   * Automatically places the node in the first parent when moved ontop of it
   */
  function handleMove(node: Node, old_pos: XYPosition) {
    if (!node.computed?.positionAbsolute) {
      console.error("Node with no absolute position in move handler");
      return;
    }
    const position = {
      x: node.computed.positionAbsolute.x,
      y: node.computed.positionAbsolute.y,
    };
    const intersecting = getIntersectingNodes(node).filter(
      (n) =>
        n.type === "segment" ||
        (node.type !== "customGroup" && n.type === "customGroup"),
    );
    if (intersecting.length === 0) {
      addHistoryEntry({
        type: "move",
        id: node.id,
        from: old_pos,
        to: node.position,
        parent: {
          from: node.parentNode ?? null,
          to: null,
        },
      });
      updateNode(node.id, {
        parentNode: undefined,
        position,
      });
      return;
    }
    const parent = findFirstParentAndRelativePos(intersecting, position);
    if (parent) {
      addHistoryEntry({
        type: "move",
        id: node.id,
        from: old_pos,
        to: parent.relative_pos,
        parent: {
          from: node.parentNode ?? null,
          to: parent.node.id,
        },
      });
      updateNode(node.id, {
        parentNode: parent.node.id,
        position: parent.relative_pos,
      });
    }
  }

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

  let contextmenuPos: XYPosition = { x: 0, y: 0 };
  let contextmenuOpen = false;
</script>

<FileDropHandler />

<div
  class="h-screen bg-neutral-600"
  on:selectstart|preventDefault={() => {
    // This prevents wierd selection in textareas when selecting nodes
  }}
>
  <ContextMenu.Root bind:open={contextmenuOpen}>
    <ContextMenu.Trigger
      class="absolute h-full w-full"
      on:contextmenu={(event) => {
        contextmenuPos.x = event.detail.detail.originalEvent.clientX;
        contextmenuPos.y = event.detail.detail.originalEvent.clientY;
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
        ondelete={async (deleted) => {
          console.debug("ondelete", deleted);
          const childNodes = findChildNodes(deleted.nodes, $nodes);
          if (childNodes.length > 0) {
            const { deletedNodes, deletedEdges } = await deleteElements({
              nodes: childNodes,
            });
            deleted.nodes.push(...deletedNodes);
            deleted.edges.push(...deletedEdges);
            console.debug("ondelete with children", deleted);
          }
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
          addHistoryEntry({ type: "create", edges: [edge] });
          return edge;
        }}
        deleteKey={["Backspace", "Delete"]}
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
          console.debug("on node drag start", event.detail.targetNode);
          if (!event.detail.targetNode) return;
          toggleNodeEdgeHidden([event.detail.targetNode]);
          // For node move history
          moveNodeStartPos = event.detail.targetNode.position;
        }}
        on:nodedragstop={(event) => {
          console.debug("on node drag stop", event.detail.targetNode);
          if (!event.detail.targetNode) return;
          handleMove(event.detail.targetNode, moveNodeStartPos);
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
            <Toolbar>
              <AutoSave />
            </Toolbar>
          </div>
          <Menubar />
        </Panel>

        <Panel>
          <a
            href="https://swedengamearena.com/en/us/sweden-game-startup/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SgaLogo class="pointer-events-none h-12" />
          </a>
        </Panel>

        <PagesList on:pageSwap={() => nodeEdgesToShow.clear()} />

        <ContextMenu.Content>
          <AddItemMenuPart
            type="context-menu"
            bind:createPos={contextmenuPos}
          />
          <ContextMenu.Separator />
          <PasteItemMenuPart
            type="context-menu"
            bind:createPos={contextmenuPos}
          />
        </ContextMenu.Content>

        <FlowControls />
        <Background variant={BackgroundVariant.Dots} />
        <MiniMap />

        <CopyPasteShortcutHandler />

        <div id="itemDetailsPortal" />
      </SvelteFlow>
    </ContextMenu.Trigger>
  </ContextMenu.Root>
</div>
