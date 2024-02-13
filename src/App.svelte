<script lang="ts">
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
    type Edge,
  } from "@xyflow/svelte";

  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import "@xyflow/svelte/dist/style.css";

  import Item from "$lib/Item.svelte";

  const nodeTypes = {
    item: Item,
  };

  // We are using writables for the nodes and edges to sync them easily. When a user drags a node for example, Svelte Flow updates its position.
  const nodes = writable([
    {
      id: "1",
      type: "input",
      data: { label: "Input Node" },
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      type: "item",
      data: {
        label: "Node",
        item: writable({
          name: "steam",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
        }),
      },
      position: { x: 0, y: 150 },
    },
    {
      id: "3",
      type: "item",
      data: {
        label: "Node",
        item: writable({
          name: "empty test",
        }),
      },
      position: { x: 100, y: 150 },
    },
  ] as Node[]);

  // same for edges
  const edges = writable([
    {
      id: "1-2-test",
      type: "default",
      source: "1",
      target: "2",
      label: "Edge Text",
      hidden: true,
    },
    {
      id: "1-3-test",
      type: "default",
      source: "1",
      target: "3",
      label: "Edge Text 2",
      hidden: true,
    },
  ] as Edge[]);

  const snapGrid: SnapGrid = [25, 25];

  function hideAllEdges() {
    for (const edge of $edges) {
      edge.hidden = true;
    }
    $edges = $edges;
  }
  function showNodeEdges(node: Node) {
    for (const edge of $edges) {
      edge.hidden = edge.source !== node.id && edge.target !== node.id;
    }
    $edges = $edges;
  }
</script>

<ItemDetails />

<div
  style:grid-template-rows="auto 1fr"
  class="grid min-h-screen bg-neutral-600"
>
  <h1 class="col-span-full mx-2 text-lg font-bold text-white">
    Business Model Canvas
  </h1>
  <SvelteFlow
    {nodes}
    {edges}
    {snapGrid}
    {nodeTypes}
    fitView
    on:paneclick={hideAllEdges}
    on:nodeclick={(event) => {
      console.log("on node click", event.detail.node);
      showNodeEdges(event.detail.node);
    }}
    on:nodedragstart={(event) => {
      console.log("on node drag start", event.detail.node);
      showNodeEdges(event.detail.node);
    }}
  >
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
    <MiniMap />
  </SvelteFlow>
</div>
