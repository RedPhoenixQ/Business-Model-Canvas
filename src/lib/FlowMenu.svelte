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
  import { getSegmentInfo } from "./info/segments";
  import { useProject } from "./project";
  import { createEventDispatcher } from "svelte";

  export let type: MenuType;
  export let createPos: XYPosition;

  const dispatch = createEventDispatcher<{ close: undefined }>();

  const { Content, Item, Sub, SubTrigger, SubContent, Label } = menu(type);

  const nodes = useNodes();
  const { screenToFlowPosition, getIntersectingNodes } = useSvelteFlow();
  const { page } = useProject();

  $: clickedSegment = getIntersectingNodes({
    ...screenToFlowPosition(createPos),
    width: 1,
    height: 1,
  }).find((node) => node.type === "segment");
  $: segmentInfo = clickedSegment
    ? getSegmentInfo($page.template, clickedSegment.id)
    : undefined;

  /**
   * @returns id of the created node
   */
  function addItem(
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
    $nodes.push(node);
    $nodes = $nodes;
    addHistoryEntry({ type: "createNode", node });
    return node;
  }
</script>

<Content>
  {#if segmentInfo?.presetNodes}
    <Sub>
      <SubTrigger
        on:click={(event) => {
          addItem(event, "item");
          dispatch("close");
        }}
      >
        <PlusIcon class="mr-2" size="20" />
        Add Item
      </SubTrigger>
      <SubContent>
        <Label>Presets</Label>
        {#each Object.entries(segmentInfo.presetNodes) as [name, preset]}
          <Item
            on:click={(event) => {
              addItem(event, preset);
            }}
          >
            {name}
          </Item>
        {/each}
      </SubContent>
    </Sub>
  {:else}
    <Item
      on:click={(event) => {
        addItem(event, "item");
      }}
    >
      <PlusIcon class="mr-2" size="20" />
      Item
    </Item>
  {/if}
  {#if segmentInfo?.presetGroups}
    <Sub>
      <SubTrigger
        on:click={(event) => {
          addItem(event, "customGroup");
          dispatch("close");
        }}
      >
        <PlusIcon class="mr-2" size="20" />
        Group
      </SubTrigger>
      <SubContent>
        <Label>Presets</Label>
        {#each Object.entries(segmentInfo.presetGroups) as [name, preset]}
          <Item
            on:click={(event) => {
              const group = addItem(event, preset.group);
              $nodes.push(
                ...preset.nodes.map((node) => ({
                  ...node,
                  parentNode: group.id,
                  id: crypto.randomUUID(),
                })),
              );
              $nodes = $nodes;
            }}
          >
            {name}
          </Item>
        {/each}
      </SubContent>
    </Sub>
  {:else}
    <Item
      on:click={(event) => {
        addItem(event, "customGroup");
      }}
    >
      <PlusIcon class="mr-2" size="20" />
      Group
    </Item>
  {/if}
  <Item
    on:click={(event) => {
      addItem(event, "slider");
    }}
  >
    <PlusIcon class="mr-2" size="20" />
    Slider
  </Item>
</Content>
