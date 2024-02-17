<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import File from "./File.svelte";
  import Settings from "./Settings.svelte";
</script>

<Menubar.Root>
  <slot />
  <File />
  <Settings />
</Menubar.Root>
