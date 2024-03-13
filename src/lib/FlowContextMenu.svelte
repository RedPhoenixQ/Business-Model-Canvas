<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import type { CustomEventHandler } from "bits-ui";
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
  import { findFirstParentAndRelativePos } from "./info/nodes";

  export let opened_at: XYPosition;

  const nodes = useNodes();
  const { screenToFlowPosition, getIntersectingNodes } = useSvelteFlow();

  function addItem(
    event: CustomEventHandler<MouseEvent>,
    type: keyof typeof defaultNodes,
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

    const parent = findFirstParentAndRelativePos(
      intersecting.filter(
        (node) => node.type === "segment" || node.type === "customGroup",
      ),
      position,
    );

    let node: Node = {
      ...structuredClone(defaultNodes[type]),
      id: crypto.randomUUID() as string,
      position: parent ? parent?.relative_pos : position,
      parentNode: parent?.node?.id,
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
