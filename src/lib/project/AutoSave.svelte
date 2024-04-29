<script lang="ts">
  import { onMount } from "svelte";
  import { savedStore, useFile } from "./file";
  import { FileIcon, SaveIcon, XCircleIcon } from "lucide-svelte";
  import { ToolbarButton } from "$lib/components/custom/toolbar";

  const { loadLocal, saveLocal } = useFile();

  function autosave() {
    console.debug(
      "visibility changed",
      document.visibilityState,
      document.hidden,
    );
    if (!document.hidden) return;
    console.debug("Autosaving to localstorage");
    saveLocal();
  }

  onMount(() => {
    loadLocal();
    return () => {
      saveLocal();
    };
  });
</script>

<svelte:document
  on:visibilitychange={autosave}
  on:keydown={(event) => {
    if (event.ctrlKey && event.code === "KeyS") {
      event.preventDefault();
      saveLocal();
    }
  }}
/>

<ToolbarButton
  class="relative p-1"
  title={$savedStore === "unsaved"
    ? "Save unsaved changes"
    : $savedStore === "local"
      ? "Project is saved in the browser"
      : "Project is saved to file"}
  on:click={() => saveLocal()}
>
  <SaveIcon />
  {#if $savedStore === "unsaved"}
    <XCircleIcon
      class="absolute bottom-0 right-0 fill-background"
      size={14}
      strokeWidth={2}
    />
  {:else if $savedStore === "file"}
    <FileIcon
      class="absolute bottom-0 right-0 fill-background"
      size={14}
      strokeWidth={2}
    />
  {/if}
</ToolbarButton>
