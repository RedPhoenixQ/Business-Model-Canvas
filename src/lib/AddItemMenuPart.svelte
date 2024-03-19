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

  export let type: MenuType;
  export let createPos: XYPosition;

  const { Item, Sub, SubTrigger, SubContent, Label } = menu(type);

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
    $nodes.push(node);
    $nodes = $nodes;
    addHistoryEntry({ type: "create", nodes: [node] });
    return node;
  }
</script>

{#if !segmentInfo?.presetNodes}
  <Item
    on:click={(event) => {
      createNode(event, "item");
    }}
  >
    <PlusIcon class="mr-2" size="20" />
    Item
  </Item>
{:else}
  <Sub>
    <SubTrigger
      on:click={(event) => {
        document.dispatchEvent(
          new CustomEvent("custom-menu-close", { detail: "" }),
        );
        createNode(event, "item");
      }}
    >
      <PlusIcon class="mr-2" size="20" />
      Item
    </SubTrigger>
    <SubContent>
      <Item
        on:click={(event) => {
          createNode(event, "item");
        }}
      >
        <PlusIcon class="mr-2" size="20" />
        New empty
      </Item>
      <Label>Presets</Label>
      {#each Object.entries(segmentInfo.presetNodes) as [name, preset]}
        <Item
          on:click={(event) => {
            createNode(event, preset);
          }}
        >
          {name}
        </Item>
      {/each}
    </SubContent>
  </Sub>
{/if}
{#if !segmentInfo?.presetGroups}
  <Item
    on:click={(event) => {
      createNode(event, "customGroup");
    }}
  >
    <PlusIcon class="mr-2" size="20" />
    Group
  </Item>
{:else}
  <Sub>
    <SubTrigger
      on:click={(event) => {
        document.dispatchEvent(
          new CustomEvent("custom-menu-close", { detail: "" }),
        );
        createNode(event, "customGroup");
      }}
    >
      <PlusIcon class="mr-2" size="20" />
      Group
    </SubTrigger>
    <SubContent>
      <Item
        on:click={(event) => {
          createNode(event, "item");
        }}
      >
        <PlusIcon class="mr-2" size="20" />
        New empty
      </Item>
      <Label>Presets</Label>
      {#each Object.entries(segmentInfo.presetGroups) as [name, preset]}
        <Item
          on:click={(event) => {
            const group = createNode(event, preset.group);
            const new_nodes = preset.nodes.map((node) => ({
              ...node,
              parentNode: group.id,
              id: crypto.randomUUID(),
            }));
            $nodes.push(...new_nodes);
            $nodes = $nodes;
          }}
        >
          {name}
        </Item>
      {/each}
    </SubContent>
  </Sub>
{/if}
<Item
  on:click={(event) => {
    createNode(event, "slider");
  }}
>
  <PlusIcon class="mr-2" size="20" />
  Slider
</Item>
