<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import {
    useSvelteFlow,
    type Node,
    type Rect,
    type XYPosition,
    useNodes,
  } from "@xyflow/svelte";
  import type { ItemData } from "./nodes/item";
  import type { GroupData } from "./nodes/group";
  import type { SliderData } from "./nodes/slider";
  import { addHistoryEntry } from "./project/history";
  import { PlusIcon } from "lucide-svelte";
  import type { nodeTypes } from "./nodes";

  export let opened_at: XYPosition;

  const nodes = useNodes();
  const { screenToFlowPosition, getIntersectingNodes } = useSvelteFlow();

  function addItem(any_event: any, type: keyof typeof nodeTypes) {
    // Event type from bits-ui handlers is incorrect so we force the type
    const event = any_event as CustomEvent<{
      originalEvent: PointerEvent;
    }>;
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

    let parent = intersecting.find(
      (node) => node.type === "segment" || node.type === "customGroup",
    );

    if (parent) {
      // Set position relative to parent
      position = {
        x: position.x - parent.position.x,
        y: position.y - parent.position.y,
      };
    }

    const node: Node<unknown, keyof typeof nodeTypes> = {
      type,
      id: crypto.randomUUID() as string,
      position,
      data: undefined,
      extent: "parent",
      parentNode: parent?.id,
    };
    switch (type) {
      case "item":
        node.data = {
          name: "",
          icon: {},
          description: "",
          showText: false,
          showTitle: false,
          textHeight: 80,
          textWidth: 120,
        } satisfies ItemData;
        break;
      case "slider":
        node.data = {
          value: [50],
        } satisfies SliderData;
        break;
      case "customGroup":
        node.zIndex = -5;
        node.width = 60;
        node.height = 60;
        node.data = {
          title: "Test",
        } satisfies GroupData;
        break;
      default:
        break;
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
          addItem(event, "item");
        }}>Item</ContextMenu.Item
      >
      <ContextMenu.Item
        on:click={(event) => {
          addItem(event, "customGroup");
        }}>Group</ContextMenu.Item
      >
      <ContextMenu.Item
        on:click={(event) => {
          addItem(event, "slider");
        }}>Slider</ContextMenu.Item
      >
    </ContextMenu.SubContent>
  </ContextMenu.Sub>
</ContextMenu.Content>
