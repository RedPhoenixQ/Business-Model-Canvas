<script lang="ts">
  import { UndoIcon, RedoIcon } from "lucide-svelte";
  import * as Menubar from "$lib/components/ui/menubar";
  import { useHistory, undoEmpty, redoEmpty } from "$lib/project/history";

  const { undo, redo, applyHistory } = useHistory();

  function shortcuts(event: KeyboardEvent) {
    switch (event.code) {
      case "KeyZ":
        if (!event.ctrlKey) return;
        applyHistory(!event.shiftKey);
        break;
      case "KeyY":
        if (!event.ctrlKey) return;
        redo();
        break;

      default:
        return;
    }
    console.log("Shortcut", event);
    event.preventDefault();
  }
</script>

<svelte:document on:keydown={shortcuts} />

<Menubar.Menu>
  <Menubar.Trigger>Edit</Menubar.Trigger>
  <Menubar.Content class="[&_[role=menuitem]]:gap-2">
    <Menubar.Item on:click={undo} disabled={$undoEmpty}>
      <UndoIcon size="20" />
      Undo
      <Menubar.Shortcut>^Z</Menubar.Shortcut>
    </Menubar.Item>
    <Menubar.Item on:click={redo} disabled={$redoEmpty}>
      <RedoIcon size="20" />
      Redo
      <Menubar.Shortcut>^Y</Menubar.Shortcut>
    </Menubar.Item>
  </Menubar.Content>
</Menubar.Menu>
