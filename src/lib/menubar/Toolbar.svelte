<script lang="ts">
  import { UndoIcon, RedoIcon } from "lucide-svelte";
  import * as Toolbar from "$lib/components/custom/toolbar";
  import { useHistory, redoEmpty, undoEmpty } from "$lib/project/history";

  const { undo, redo } = useHistory();
</script>

<Toolbar.Root>
  <Toolbar.Button class="p-1" disabled={$undoEmpty} on:click={undo}>
    <UndoIcon />
  </Toolbar.Button>
  <Toolbar.Button class="p-1" disabled={$redoEmpty} on:click={redo}>
    <RedoIcon />
  </Toolbar.Button>
  <slot />
</Toolbar.Root>
