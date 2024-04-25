<script lang="ts">
  import { ClipboardIcon, ClipboardXIcon } from "lucide-svelte";
  import { type XYPosition } from "@xyflow/svelte";
  import { menu, type MenuType } from "../components/custom/menu";
  import { nodeClipboard, usePaste } from ".";

  export let type: MenuType;
  export let createPos: XYPosition;

  const { Group, Item, Shortcut } = menu(type);

  const paste = usePaste();
</script>

<Group>
  <Item
    class="gap-2"
    disabled={!$nodeClipboard}
    on:click={(event) =>
      paste(
        createPos ?? {
          x: event.detail.originalEvent.clientX,
          y: event.detail.originalEvent.clientY,
        },
      )}
  >
    <ClipboardIcon size={20} />
    Paste
    <Shortcut>Ctrl+V</Shortcut>
  </Item>
  <Item
    class="gap-2"
    disabled={!$nodeClipboard}
    on:click={(event) =>
      paste(
        createPos ?? {
          x: event.detail.originalEvent.clientX,
          y: event.detail.originalEvent.clientY,
        },
        false,
      )}
  >
    <ClipboardXIcon size={20} />
    Paste without connections
    <Shortcut>Ctrl+Shift+V</Shortcut>
  </Item>
</Group>
