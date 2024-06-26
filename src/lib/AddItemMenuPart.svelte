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
  import {
    findFirstParentAndRelativePos,
    type DefaultNode,
  } from "./info/nodes";
  import { menu, type MenuType } from "./components/custom/menu";
  import { type SegmentInfo } from "./info/segments";
  import { templateInfoStore } from "./project";

  export let type: MenuType;
  export let createPos: XYPosition;

  const { Group, Item, Sub, SubTrigger, SubContent, Label } = menu(type);

  const nodes = useNodes();
  const { screenToFlowPosition, getIntersectingNodes } = useSvelteFlow();

  $: clickedSegment = getIntersectingNodes({
    ...screenToFlowPosition(createPos),
    width: 1,
    height: 1,
  }).find((node) => node.type === "segment");
  $: segmentInfo = clickedSegment
    ? $templateInfoStore.nodes?.[clickedSegment.id]
    : undefined;

  /**
   * @returns id of the created node
   */
  function createNode(
    event: CustomEventHandler<MouseEvent>,
    typeOrNode: DefaultNode | keyof typeof defaultNodes,
  ): Node {
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
      ...(typeof typeOrNode === "string"
        ? structuredClone(defaultNodes[typeOrNode])
        : typeOrNode),
      id: crypto.randomUUID() as string,
      position: parent ? parent?.relative_pos : position,
      parentNode: parent?.node?.id,
    };
    return node;
  }

  function addNode(
    event: CustomEventHandler<MouseEvent>,
    typeOrNode: DefaultNode | keyof typeof defaultNodes,
  ) {
    const node = createNode(event, typeOrNode);
    if (
      typeOrNode === "customGroup" ||
      (typeof typeOrNode === "object" && typeOrNode.type === "customGroup")
    ) {
      // Groups should be places after segments and before other nodes
      // for @xyflow/svelte to behave properly when deleting groups
      const lastGroupIdx = $nodes.findIndex(
        ({ type }) => type !== "segment" && type !== "customGroup",
      );
      $nodes = [
        ...$nodes.slice(0, lastGroupIdx),
        node,
        ...$nodes.slice(lastGroupIdx),
      ];
    } else {
      $nodes = [...$nodes, node];
    }
    addHistoryEntry({ type: "create", nodes: [node] });
  }

  function addGroupPreset(
    event: CustomEventHandler<MouseEvent>,
    preset: Required<SegmentInfo>["presetGroups"][string],
  ) {
    const group = createNode(event, preset.group);
    const new_nodes: Node[] = preset.nodes.map((node) => ({
      ...node,
      parentNode: group.id,
      id: crypto.randomUUID(),
    }));
    new_nodes.push(group);
    $nodes = [...$nodes, ...new_nodes];
    addHistoryEntry({ type: "create", nodes: new_nodes });
  }
</script>

<Group>
  {#if !segmentInfo?.presetNodes}
    <Item
      class="gap-2"
      on:click={(event) => {
        addNode(event, "item");
      }}
    >
      <PlusIcon size="20" />
      Item
    </Item>
  {:else}
    <Sub>
      <SubTrigger
        class="gap-2"
        on:click={(event) => {
          document.dispatchEvent(
            new CustomEvent("custom-menu-close", { detail: "" }),
          );
          addNode(event, "item");
        }}
      >
        <PlusIcon size="20" />
        Item
      </SubTrigger>
      <SubContent>
        <Item
          class="gap-2"
          on:click={(event) => {
            addNode(event, "item");
          }}
        >
          <PlusIcon size="20" />
          New empty
        </Item>
        <Label>Presets</Label>
        {#each Object.entries(segmentInfo.presetNodes) as [name, preset]}
          <Item on:click={(event) => addNode(event, preset)}>
            {name}
          </Item>
        {/each}
      </SubContent>
    </Sub>
  {/if}
  <Item
    class="gap-2"
    on:click={(event) => {
      addNode(event, "text");
    }}
  >
    <PlusIcon size="20" />
    Text
  </Item>
  {#if !segmentInfo?.presetGroups}
    <Item class="gap-2" on:click={(event) => addNode(event, "customGroup")}>
      <PlusIcon size="20" />
      Group
    </Item>
  {:else}
    <Sub>
      <SubTrigger
        class="gap-2"
        on:click={(event) => {
          document.dispatchEvent(
            new CustomEvent("custom-menu-close", { detail: "" }),
          );
          addNode(event, "customGroup");
        }}
      >
        <PlusIcon size="20" />
        Group
      </SubTrigger>
      <SubContent>
        <Item class="gap-2" on:click={(event) => addNode(event, "item")}>
          <PlusIcon size="20" />
          New empty
        </Item>
        <Label>Presets</Label>
        {#each Object.entries(segmentInfo.presetGroups) as [name, preset]}
          <Item on:click={(event) => addGroupPreset(event, preset)}>
            {name}
          </Item>
        {/each}
      </SubContent>
    </Sub>
  {/if}
  <Item class="gap-2" on:click={(event) => addNode(event, "slider")}>
    <PlusIcon size="20" />
    Slider
  </Item>
</Group>
