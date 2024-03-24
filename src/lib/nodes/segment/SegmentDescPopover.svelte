<script lang="ts">
  import { InfoIcon } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover";
  import type { SegmentInfo } from "$lib/info/segments/index";

  export let info: SegmentInfo;

  let open = false;
</script>

{#if info.description}
  <Popover.Root bind:open>
    <Popover.Trigger class="pointer-events-auto">
      <InfoIcon />
    </Popover.Trigger>
    <Popover.Content class="space-y-2" align="end" side="bottom">
      <div class="mb-2 text-lg">{info.title}</div>
      <svelte:component this={info.description} />
    </Popover.Content>
  </Popover.Root>
{/if}
