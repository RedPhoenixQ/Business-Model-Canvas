<script lang="ts">
  import { onMount } from "svelte";
  import { useProject } from ".";

  const { toJSON, fromJSON } = useProject();

  function save() {
    localStorage.setItem("save", toJSON());
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

<svelte:document on:visibilitychange={autosave} />
