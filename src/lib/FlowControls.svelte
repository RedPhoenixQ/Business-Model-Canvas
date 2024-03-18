<script lang="ts">
  import { EyeIcon, EyeOffIcon } from "lucide-svelte";
  import { Controls, ControlButton } from "@xyflow/svelte";
  import { showItemNames } from "$lib/nodes/item";
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
</Controls>
