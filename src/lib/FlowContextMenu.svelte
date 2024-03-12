<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import {
    useSvelteFlow,
    type Node,
    type Rect,
    type XYPosition,
    useNodes,
  } from "@xyflow/svelte";
  import { addHistoryEntry } from "./project/history";
  import { PlusIcon } from "lucide-svelte";
  import { defaultNodes } from "./nodes";

  export let opened_at: XYPosition;

  const nodes = useNodes();
  const { screenToFlowPosition, getIntersectingNodes } = useSvelteFlow();

  function addItem(any_event: any, type: keyof typeof defaultNodes) {
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

    let node: Node = {
      ...structuredClone(defaultNodes[type]),
      id: crypto.randomUUID() as string,
      position: position,
      parentNode: parent?.id,
    };
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
