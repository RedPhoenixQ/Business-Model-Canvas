<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import {
    useSvelteFlow,
    type Node,
    type Rect,
    type XYPosition,
    useNodes,
  } from "@xyflow/svelte";
  import { writable, type Writable } from "svelte/store";
  import { itemDetails, type Item } from "./nodes/items";

  export let opened_at: XYPosition;

  const nodes = useNodes();
  const { screenToFlowPosition, getIntersectingNodes } = useSvelteFlow();

  function addItem(
    event: CustomEvent<{
      originalEvent: PointerEvent;
    }>,
  ) {
    console.debug("add item event", event);

    let position = screenToFlowPosition(
      opened_at ?? {
        x: event.detail.originalEvent.clientX,
        y: event.detail.originalEvent.clientY,
      },
    );
    console.debug("add at position", position);

    const intersecting = getIntersectingNodes({
      ...position,
      width: 1,
      height: 1,
    } as Rect);
    console.debug("add item intersection", intersecting);

    let parent = intersecting.find((node) => node.type === "segment");

    if (parent) {
      // Set position relative to parent
      position = {
        x: position.x - parent.position.x,
        y: position.y - parent.position.y,
      };
    }

    const item = writable({
      name: "",
    } as Item);
    $nodes.push({
      type: "item",
      id: crypto.randomUUID() as string,
      position,
      data: {
        item,
      },
      extent: "parent",
      parentNode: parent?.id,
    } as Node<{ item: Writable<Item> }>);
    $nodes = $nodes;
    $itemDetails = item;
  }
</script>

<ContextMenu.Content>
  <ContextMenu.Item
    on:click={(event) => {
      // @ts-ignore: Incorrect event typing
      addItem(event);
    }}>Add Item</ContextMenu.Item
  >
</ContextMenu.Content>
