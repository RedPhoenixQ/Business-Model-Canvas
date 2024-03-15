<script lang="ts">
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
  import { menu, type MenuType } from "./components/custom/menu";

  export let type: MenuType;
  export let createPos: XYPosition;

  const { Content, Item, Sub, SubTrigger, SubContent } = menu(type);

  const nodes = useNodes();
  const { screenToFlowPosition, getIntersectingNodes } = useSvelteFlow();

  function addItem(
    event: CustomEventHandler<MouseEvent>,
    type: keyof typeof defaultNodes,
  ) {
    console.debug("add item event", event);

    let position = screenToFlowPosition(
      createPos ?? {
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

<Content>
  <Sub>
    <SubTrigger>
      <PlusIcon class="mr-2" size="20" />
      Add
    </SubTrigger>
    <SubContent>
      <Item
        on:click={(event) => {
          addItem(event, "item");
        }}>Item</Item
      >
      <Item
        on:click={(event) => {
          addItem(event, "customGroup");
        }}>Group</Item
      >
      <Item
        on:click={(event) => {
          addItem(event, "slider");
        }}>Slider</Item
      >
    </SubContent>
  </Sub>
</Content>
