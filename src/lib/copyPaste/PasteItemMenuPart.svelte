<script lang="ts">
  import { ClipboardIcon } from "lucide-svelte";
  import { type XYPosition } from "@xyflow/svelte";
  import { menu, type MenuType } from "../components/custom/menu";
  import { nodeClipboard, usePaste } from ".";

  export let type: MenuType;
  export let createPos: XYPosition;

  const { Item } = menu(type);

  const paste = usePaste();
</script>

<Item
  disabled={!$nodeClipboard}
  on:click={(event) =>
    paste(
      createPos ?? {
        x: event.detail.originalEvent.clientX,
        y: event.detail.originalEvent.clientY,
      },
    )}
>
  <ClipboardIcon size={20} class="mr-2" />
  Paste
</Item>
