<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import { projectStore } from "$lib/project";
</script>

<Input
  class="rounded-lg"
  placeholder="Unnamed project"
  bind:value={$projectStore.name}
/>
