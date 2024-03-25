<script lang="ts">
  import { UndoIcon, RedoIcon } from "lucide-svelte";
  import * as Menubar from "$lib/components/ui/menubar";
  import { useHistory, undoEmpty, redoEmpty } from "$lib/project/history";

  const { undo, redo, applyHistory } = useHistory();

  function shortcuts(event: KeyboardEvent) {
    const ctrl = event.ctrlKey || event.metaKey;
    switch (event.code) {
      case "KeyZ":
        if (!ctrl) return;
        applyHistory(!event.shiftKey);
        break;
      case "KeyY":
        if (!ctrl) return;
        redo();
        break;

      default:
        return;
    }
    console.debug("Shortcut", event);
    event.preventDefault();
  }
</script>

<svelte:document on:keydown={shortcuts} />

<Menubar.Menu>
  <Menubar.Trigger>Edit</Menubar.Trigger>
  <Menubar.Content>
    <Menubar.Item class="gap-2" on:click={undo} disabled={$undoEmpty}>
      <UndoIcon size="20" />
      Undo
      <Menubar.Shortcut>Ctrl/Cmd+Z</Menubar.Shortcut>
    </Menubar.Item>
    <Menubar.Item class="gap-2" on:click={redo} disabled={$redoEmpty}>
      <RedoIcon size="20" />
      Redo
      <Menubar.Shortcut>Ctrl/Cmd+Y</Menubar.Shortcut>
    </Menubar.Item>
  </Menubar.Content>
</Menubar.Menu>
