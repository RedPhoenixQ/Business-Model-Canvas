<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import File from "./File.svelte";
  import Settings from "./Settings.svelte";
  import Debug from "./Debug.svelte";
  import Edit from "./Edit.svelte";
  import Help from "./Help.svelte";
</script>

<Menubar.Root class="w-fit">
  <File />
  <Settings />
  <Edit />
  <Help />
  {#if import.meta.env.DEV}
    <Debug />
  {/if}
</Menubar.Root>
