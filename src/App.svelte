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
    type Edge,
    Panel,
  } from "@xyflow/svelte";
  import Item from "$lib/Item.svelte";
  import Segment from "$lib/Segment.svelte";
  import { defaultSegments, type SegmentKey } from "$lib/layout";

  const nodeTypes = {
    item: Item,
    segment: Segment,
  };

  // We are using writables for the nodes and edges to sync them easily. When a user drags a node for example, Svelte Flow updates its position.
  const nodes = writable([
    ...defaultSegments,
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
        item: writable({
          name: "steam",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
        }),
      },
      position: { x: 0, y: 0 },
      parentNode: "key-activities" as SegmentKey,
      extent: "parent",
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
      position: { x: 0, y: 100 },
      parentNode: "key-activities" as SegmentKey,
      extent: "parent",
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

<div class="h-screen bg-neutral-600">
  <Panel
    position="top-left"
    class="bg-white p-2 text-black shadow-sm dark:bg-neutral-700 dark:text-white"
  >
    <h1 class="text-lg font-bold">Business Model Canvas</h1>
  </Panel>
  <SvelteFlow
    {nodes}
    {edges}
    {snapGrid}
    {nodeTypes}
    fitView
    colorMode="system"
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
