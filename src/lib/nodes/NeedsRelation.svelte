<script lang="ts">
  import { templateInfoStore } from "$lib/project";
  import { getConnectedEdges, useEdges, useSvelteFlow } from "@xyflow/svelte";
  import { InfoIcon } from "lucide-svelte";

  export let id: string;

  const { getIntersectingNodes, getNode } = useSvelteFlow();
  const edges = useEdges();

  $: missingRelations = findMissingRelations(id);

  function findMissingRelations(id: string): string[][] | undefined {
    const thisNode = getNode(id);
    if (!thisNode) return;
    const intersecting = getIntersectingNodes(thisNode, undefined);
    const segment = intersecting.find((node) => node.type === "segment");
    if (!segment) return;
    const needsRelation = $templateInfoStore.nodes[segment.id].needsRelation;
    if (!needsRelation) return;

    // Find all parents of thisNode to see e.g if entire group has a connection
    let thisNodeAndParents = [thisNode];
    let currentParent = thisNode.parentNode;
    while (currentParent) {
      const parent = intersecting.find((node) => node.id === currentParent);
      if (!parent) break;
      currentParent = parent.parentNode;
      console.debug("found parent for", id, parent);
      thisNodeAndParents.push(parent);
    }

    const connections = getConnectedEdges(thisNodeAndParents, $edges);
    const connectedSegments: string[] = [];
    for (const { source, target } of connections) {
      const connectedToTarget = thisNodeAndParents.some(
        (node) => node.id === source,
      );
      const node = getNode(connectedToTarget ? target : source);
      if (!node || !node.parentNode) continue;
      let parent = getNode(node.parentNode);
      while (parent && parent.type !== "segment") {
        parent = parent.parentNode ? getNode(parent.parentNode) : undefined;
      }
      if (!parent) continue;
      connectedSegments.push(parent.id);
    }

    const missing = needsRelation.map((needed) =>
      needed.filter((segment) => !connectedSegments.includes(segment)),
    );
    if (missing.some((needed) => needed.length === 0)) {
      // We have fullfilled all requirements in one of the sets, no missing relations
      return;
    }
    return missing;
  }
</script>

{#if missingRelations}
  <div
    class="group/relation absolute right-0 top-0 size-2 -translate-y-1/2 translate-x-1/2 rounded-full"
  >
    <InfoIcon size={12} class="rounded-full fill-orange-500" />
    <div
      class="pointer-events-none absolute left-full top-full m-1 w-fit space-y-2 rounded bg-card p-2 text-card-foreground opacity-0 transition-opacity group-hover/relation:opacity-100"
    >
      <nobr>Missing relations to:</nobr>
      <div>
        {#each missingRelations as missing, i}
          {#if i > 0}
            <div
              class="grid items-center gap-1"
              style="grid-template-columns: 1fr auto 1fr;"
            >
              <hr />
              OR
              <hr />
            </div>
          {/if}
          {#each missing as m, i}
            {@const info = $templateInfoStore.nodes[m]}
            {#if i > 0}
              <span> & </span>
            {/if}
            <nobr class="rounded px-1 text-sm {info.classes}">{info.title}</nobr
            >
          {/each}
        {/each}
      </div>
    </div>
  </div>
{/if}
