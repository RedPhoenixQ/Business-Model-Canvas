<script lang="ts">
  import { useProject } from ".";

  const { fromJSON } = useProject();

  let isDraging = false;
</script>

<svelte:body
  on:dragover|preventDefault={() => (isDraging = true)}
  on:dragleave={() => (isDraging = false)}
  on:drop={async (event) => {
    isDraging = false;
    const file = event.dataTransfer?.files?.item?.(0);
    if (!file || file.type !== "application/json") return;
    event.preventDefault();
    if (
      !confirm(
        "All unsaved changes will be lost. Are you sure you want to open this file?",
      )
    ) {
      return;
    }
    fromJSON(await file.text());
  }}
/>

{#if isDraging}
  <div
    class="pointer-events-none fixed inset-0 z-40 grid place-items-center bg-background bg-opacity-50 text-center"
  >
    <span>Drop file anywhere to open</span>
  </div>
{/if}
