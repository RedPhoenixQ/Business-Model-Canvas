<script lang="ts">
  import "native-file-system-adapter";
  import { useFile } from "./file";

  const { loadFromHandle } = useFile();

  let isDraging = false;
</script>

<svelte:body
  on:dragover|preventDefault={() => (isDraging = true)}
  on:dragleave={() => (isDraging = false)}
  on:drop={async (event) => {
    isDraging = false;
    event.preventDefault();
    // Alias dataTransfer so that broswer doesn't clean it up waiting for user confirmation
    const transfer = event.dataTransfer;
    if (
      transfer &&
      confirm(
        "All unsaved changes will be lost. Are you sure you want to open this file?",
      )
    ) {
      const item = transfer?.items?.[0];
      if (!item) {
        return console.error("No item in drop event", transfer, event);
      }
      //@ts-expect-error: getAsFileSystemHandle() is pollyfilled by "native-file-system-adapter"
      loadFromHandle(await item.getAsFileSystemHandle());
    }
  }}
/>

{#if isDraging}
  <div
    class="pointer-events-none fixed inset-0 z-40 grid place-items-center bg-background bg-opacity-50 text-center"
  >
    <span>Drop file anywhere to open</span>
  </div>
{/if}
