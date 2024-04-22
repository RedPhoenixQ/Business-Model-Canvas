<script lang="ts">
  import { onMount } from "svelte";
  import { useProject } from ".";
  import { lastEntry } from "./history";
  import { Loader2Icon, SaveIcon, XCircleIcon } from "lucide-svelte";
  import { ToolbarButton } from "$lib/components/custom/toolbar";

  const { toJSON, fromJSON } = useProject();

  let savedAtEntry = $lastEntry;
  $: saved = savedAtEntry === $lastEntry;
  let saving = false;

  $: console.log($lastEntry);

  function save() {
    saving = true;
    localStorage.setItem("save", toJSON());
    savedAtEntry = $lastEntry;
    saving = false;
  }

  function load() {
    const json = localStorage.getItem("save");
    if (!json) return;
    try {
      fromJSON(json);
    } catch (err) {
      console.error("From local storage load", err);
    }
  }

  function autosave() {
    console.debug(
      "visibility changed",
      document.visibilityState,
      document.hidden,
    );
    if (!document.hidden) return;
    console.debug("Autosaving to localstorage");
    save();
  }

  onMount(() => {
    load();
    return () => {
      save();
    };
  });
</script>

<svelte:document
  on:visibilitychange={autosave}
  on:keydown={(event) => {
    if (event.ctrlKey && event.code === "KeyS") {
      event.preventDefault();
      save();
    }
  }}
/>

<ToolbarButton
  class="relative p-1"
  title={saved ? "Project is already saved" : "Save unsaved changes"}
  on:click={save}
>
  <SaveIcon />
  {#if saving}
    <Loader2Icon
      class="absolute bottom-0 right-0 animate-spin fill-background"
      size={14}
      strokeWidth={2}
    />
  {:else if !saved}
    <XCircleIcon
      class="absolute bottom-0 right-0 fill-background"
      size={14}
      strokeWidth={2}
    />
  {/if}
</ToolbarButton>
