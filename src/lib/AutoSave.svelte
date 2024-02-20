<script lang="ts">
  import { onMount } from "svelte";
  import { useSave } from "./save";

  const { saveToLocalStorage, loadFromLocalStorage } = useSave();

  function autosave() {
    console.debug(
      "visibility changed",
      document.visibilityState,
      document.hidden,
    );
    if (!document.hidden) return;
    console.debug("Autosaving to localstorage");
    saveToLocalStorage();
  }

  window.addEventListener("visibilitychange", autosave);

  onMount(() => {
    loadFromLocalStorage();
    return () => {
      window.removeEventListener("visibilitychange", autosave);
    };
  });
</script>
