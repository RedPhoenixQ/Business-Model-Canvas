<script lang="ts">
  import { InfoIcon } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover";
  import type { SegmentInfo } from "$lib/info/segments/index";

  export let info: SegmentInfo;

  let open = false;
</script>

{#if info.description}
  <Popover.Root bind:open>
    <Popover.Trigger class="pointer-events-auto p-1">
      <InfoIcon size={20} />
    </Popover.Trigger>
    <Popover.Content
      class="overflow-y-auto p-0"
      align="end"
      side="left"
      fitViewport={true}
    >
      <div
        class="sticky top-0 flex items-center border-b bg-inherit px-4 pb-2 pt-2 text-lg"
      >
        <div
          class="mr-2 inline-block size-4 flex-shrink-0 rounded-full {info.classes}"
        ></div>
        {info.title}
      </div>
      <div class="space-y-2 p-4 pt-2">
        <svelte:component this={info.description} />
      </div>
    </Popover.Content>
  </Popover.Root>
{/if}
