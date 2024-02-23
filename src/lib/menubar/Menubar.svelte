<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import File from "./File.svelte";
  import Settings from "./Settings.svelte";
  import Debug from "./Debug.svelte";
</script>

<Menubar.Root>
  <slot />
  <File />
  <Settings />
  {#if import.meta.env.DEV}
    <Debug />
  {/if}
</Menubar.Root>
