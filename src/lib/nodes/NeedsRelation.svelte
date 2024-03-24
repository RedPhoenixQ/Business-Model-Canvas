<script lang="ts">
  import { templateInfoStore } from "$lib/project";
  import { lastEntry } from "$lib/project/history";
  import { getConnectedEdges, useEdges, useSvelteFlow } from "@xyflow/svelte";
  import { AlertCircleIcon, CheckCircle2Icon } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover";
  import { createEventDispatcher } from "svelte";

  export let id: string;
  export let ignoredRelations: string[] | undefined;

  const dispatch = createEventDispatcher<{
    ignoredChange: string[] | undefined;
  }>();

  const { getNode } = useSvelteFlow();
  const edges = useEdges();

  $: relations = id || ignoredRelations ? findMissingRelations() : undefined;
  $: {
    switch ($lastEntry?.type) {
      case "move":
        if (thisAndParentIds.includes($lastEntry.id) && $lastEntry.parent) {
          relations = findMissingRelations();
        }
        break;
      case "create":
      case "delete":
        if (
          ($lastEntry.edges &&
            $lastEntry.edges.some(
              (edge) =>
                thisAndParentIds.includes(edge.source) ||
                thisAndParentIds.includes(edge.target),
            )) ||
          ($lastEntry.nodes && $lastEntry.nodes.some((node) => node.id === id))
        ) {
          console.log("history relation change", $lastEntry);
          relations = findMissingRelations();
        }
        break;
    }
  }

  $: console.debug("relations updated for", id, relations);

  let thisAndParentIds = [id];
  function findMissingRelations():
    | { missing: string[][]; needed: string[][] }
    | undefined {
    const thisNode = getNode(id);
    if (!thisNode) return;

    // Find all parents of thisNode to see e.g if entire group has a connection
    let thisNodeAndParents = [thisNode];
    let currentParent = thisNode.parentNode;
    while (currentParent) {
      const parent = getNode(currentParent);
      if (!parent) break;
      currentParent = parent.parentNode;
      console.debug("found parent for", id, parent);
      thisNodeAndParents.push(parent);
    }
    console.debug(
      "NeededRelations found this node and parents",
      thisNodeAndParents,
    );
    thisAndParentIds = thisNodeAndParents.map((node) => node.id);

    const segment = thisNodeAndParents.find((node) => node.type === "segment");
    if (!segment) return;

    const needsRelation = $templateInfoStore.nodes[segment.id].needsRelation;
    if (!needsRelation) return;

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
      needed.filter(
        (segment) =>
          !connectedSegments.includes(segment) &&
          !ignoredRelations?.includes?.(segment),
      ),
    );
    return { missing, needed: needsRelation };
  }
</script>

{#if relations}
  <Popover.Root>
    {@const hasNeedRelations = relations.missing.some(
      (set) => set.length === 0,
    )}
    <Popover.Trigger
      class="absolute right-0 top-0 size-2 -translate-y-1/2 translate-x-1/2 rounded-full"
    >
      {#if hasNeedRelations}
        <CheckCircle2Icon
          size={12}
          class="rounded-full fill-green-500 opacity-0 transition-opacity group-hover:opacity-100"
        />
      {:else}
        <AlertCircleIcon size={12} class="rounded-full fill-orange-500" />
      {/if}
    </Popover.Trigger>
    <Popover.Content class="w-fit space-y-2" side="top" sideOffset={5}>
      <nobr>Needed Relations:</nobr>
      <div>
        {#each relations.needed as needed, setIndex}
          {@const setFullfilled = relations.missing[setIndex].length === 0}
          {#if setIndex > 0}
            <div
              class="grid items-center gap-1"
              style="grid-template-columns: 1fr auto 1fr;"
            >
              <hr />
              OR
              <hr />
            </div>
          {/if}
          <div class="flex flex-wrap items-center gap-2">
            {#if setFullfilled}
              <CheckCircle2Icon class="rounded-full bg-green-500" />
            {/if}
            {#each needed as m, i}
              {@const info = $templateInfoStore.nodes[m]}
              {@const ignored = ignoredRelations?.includes?.(m) ?? false}
              {@const fullfilled = relations.missing[setIndex].includes(m)}
              {#if i > 0}
                <span> & </span>
              {/if}
              <button
                class="w-fit rounded px-1 text-sm {info.classes} {!fullfilled &&
                  'opacity-50'} {ignored && 'line-through grayscale'}"
                on:click={() => {
                  dispatch(
                    "ignoredChange",
                    ignoredRelations
                      ? ignored
                        ? ignoredRelations.filter((ig) => ig !== m)
                        : [...ignoredRelations, m]
                      : [m],
                  );
                }}
              >
                {info.title}
              </button>
            {/each}
          </div>
        {/each}
      </div>
      <p class="text-sm text-muted-foreground">
        * Dimmed names already have a relation to this item
      </p>
    </Popover.Content>
  </Popover.Root>
{/if}
