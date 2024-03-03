<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import {
    useSvelteFlow,
    type Node,
    type Rect,
    type XYPosition,
    useNodes,
  } from "@xyflow/svelte";
  import { type ItemData } from "./nodes/item";
  import { addHistoryEntry } from "./project/history";
  import { PlusIcon } from "lucide-svelte";

  type ItemNodeTypes = "item" | "text";

  export let opened_at: XYPosition;

  const nodes = useNodes();
  const { screenToFlowPosition, getIntersectingNodes } = useSvelteFlow();

  function addItem(
    event: CustomEvent<{
      originalEvent: PointerEvent;
    }>,
    type: ItemNodeTypes,
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

    const node = {
      type,
      id: crypto.randomUUID() as string,
      position,
      data: {
        name: "",
        icon: {},
        description: "",
      },
      extent: "parent",
      parentNode: parent?.id,
    } as Node<ItemData, ItemNodeTypes>;
    if (type === "text") {
      // Nodes without dimensions are node considered initialized.
      // It's a mystery why this is not needed for nodes of type "item"
      node.width = 100;
      node.height = 60;
    }
    $nodes.push(node);
    $nodes = $nodes;
    addHistoryEntry({ type: "createNode", node });
  }
</script>

<ContextMenu.Content class="[&_[role=menuitem]]:gap-2">
  <ContextMenu.Sub>
    <ContextMenu.SubTrigger>
      <PlusIcon size="20" />
      Add
    </ContextMenu.SubTrigger>
    <ContextMenu.SubContent>
      <ContextMenu.Item
        on:click={(event) => {
          // @ts-ignore: Incorrect event typing
          addItem(event, "item");
        }}>Item</ContextMenu.Item
      >
      <ContextMenu.Item
        on:click={(event) => {
          // @ts-ignore: Incorrect event typing
          addItem(event, "text");
        }}>Text</ContextMenu.Item
      >
    </ContextMenu.SubContent>
  </ContextMenu.Sub>
</ContextMenu.Content>
