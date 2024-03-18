<script lang="ts">
  import { menu, type MenuType } from "$lib/components/custom/menu";
  import {
    segmentTemplateInfo,
    type SegmentTemplateKey,
  } from "$lib/info/segments";
  import { BringToFrontIcon } from "lucide-svelte";
  import { useProject } from "$lib/project";
  import { useSvelteFlow, type XYPosition } from "@xyflow/svelte";
  import { addHistoryEntry } from "$lib/project/history";

  export let type: MenuType;
  export let id: string;

  const { getNode, updateNode } = useSvelteFlow();
  const { page } = useProject();

  const { Item, Sub, SubContent, SubTrigger } = menu(type);

  $: segments = segmentTemplateInfo[$page.template as SegmentTemplateKey].nodes;

  function moveToSegment(segment_id: string) {
    const node = getNode(id);
    if (!node || node.parentNode === segment_id) return;
    const from = structuredClone(node.position);
    const to: XYPosition = { x: 30, y: 40 };
    addHistoryEntry({
      type: "move",
      id,
      parent: {
        from: node.parentNode ?? "",
        to: segment_id,
      },
      from,
      to,
    });
    updateNode(id, {
      parentNode: segment_id,
      position: to,
    });
  }
</script>

<Sub>
  <SubTrigger>
    <BringToFrontIcon class="mr-2" size={20} />
    Move To Segment
  </SubTrigger>
  <SubContent class="max-h-72 overflow-y-scroll">
    {#each Object.entries(segments) as [segment_id, segment]}
      <Item on:click={() => moveToSegment(segment_id)}>
        <div
          class="mr-2 inline-block size-4 flex-shrink-0 rounded-full {segment.classes}"
        ></div>
        {segment.title}
      </Item>
    {/each}
  </SubContent>
</Sub>
