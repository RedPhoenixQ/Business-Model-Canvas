<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import { useProject } from "$lib/project";
  const { project } = useProject();
</script>

<Input
  class="rounded-lg"
  placeholder="Unnamed project"
  bind:value={$project.name}
/>
