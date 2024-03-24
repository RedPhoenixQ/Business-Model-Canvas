<script lang="ts">
  import {
    EyeIcon,
    EyeOffIcon,
    SquareIcon,
    BoxSelectIcon,
    AlertCircle,
  } from "lucide-svelte";
  import { Controls, ControlButton, useNodes } from "@xyflow/svelte";
  import { pageStore } from "./project";

  const nodes = useNodes();

  function setExtent(keepWith: boolean) {
    $pageStore.keepWithinParent = keepWith;
    for (const node of $nodes) {
      if (keepWith && node.extent === undefined) {
        node.extent = "parent";
      } else if (!keepWith && node.extent === "parent") {
        node.extent = undefined;
      }
    }
  }
</script>

<Controls>
  <ControlButton
    title="toggle always show names"
    aria-label="toggle always show names"
    on:click={() => ($pageStore.showItemNames = !$pageStore.showItemNames)}
  >
    {#if $pageStore.showItemNames}
      <EyeIcon class="!fill-transparent" />
    {:else}
      <EyeOffIcon class="!fill-transparent" />
    {/if}
  </ControlButton>
  <ControlButton
    class="relative"
    title="toggle show relation warnings"
    aria-label="toggle show relation warnings"
    on:click={() =>
      ($pageStore.showRelationWarnings = !$pageStore.showRelationWarnings)}
  >
    <AlertCircle class="!fill-transparent" />
    {#if !$pageStore.showRelationWarnings}
      <svg class="absolute inset-0 m-auto stroke-current">
        <line x1="0" y1="0" x2="20" y2="20" />
      </svg>
    {/if}
  </ControlButton>
  <ControlButton
    title="toggle keep items within parent"
    aria-label="toggle keep items within parent"
    on:click={() => setExtent(!$pageStore.keepWithinParent)}
  >
    {#if $pageStore.keepWithinParent}
      <SquareIcon class="!fill-transparent" />
    {:else}
      <BoxSelectIcon />
    {/if}
  </ControlButton>
</Controls>
