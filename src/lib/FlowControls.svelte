<script lang="ts">
  import {
    EyeIcon,
    EyeOffIcon,
    SquareIcon,
    BoxSelectIcon,
  } from "lucide-svelte";
  import { Controls, ControlButton, useNodes } from "@xyflow/svelte";
  import { showItemNames } from "$lib/nodes/item";
  import { useProject } from "./project";

  const nodes = useNodes();
  const { page } = useProject();

  function setExtent(keepWith: boolean) {
    $page.keepWithinParent = keepWith;
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
    on:click={() => ($showItemNames = !$showItemNames)}
  >
    {#if $showItemNames}
      <EyeIcon class="!fill-transparent" />
    {:else}
      <EyeOffIcon class="!fill-transparent" />
    {/if}
  </ControlButton>
  <ControlButton
    title="toggle keep items within parent"
    aria-label="toggle keep items within parent"
    on:click={() => setExtent(!$page.keepWithinParent)}
  >
    {#if $page.keepWithinParent}
      <SquareIcon class="!fill-transparent" />
    {:else}
      <BoxSelectIcon />
    {/if}
  </ControlButton>
</Controls>
