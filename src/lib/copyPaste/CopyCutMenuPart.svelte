<script lang="ts">
  import { CopyIcon, ScissorsIcon } from "lucide-svelte";
  import { menu, type MenuType } from "../components/custom/menu";
  import { useCopy } from ".";
  import { useSvelteFlow } from "@xyflow/svelte";

  export let type: MenuType;
  export let id: string;

  const { Item } = menu(type);

  const { getNode } = useSvelteFlow();
  const { copy, cut } = useCopy();
</script>

<svelte:window on:paste={console.log} />

<Item
  on:click={() => {
    const node = getNode(id);
    if (!node) return;
    cut([node]);
  }}
>
  <ScissorsIcon size={20} class="mr-2" />
  Cut
</Item>
<Item
  on:click={() => {
    const node = getNode(id);
    if (!node) return;
    copy([node]);
  }}
>
  <CopyIcon size={20} class="mr-2" />
  Copy
</Item>
<Item
  on:click={() => {
    const node = getNode(id);
    if (!node) return;
    copy([node], true);
  }}
>
  <CopyIcon size={20} class="mr-2" />
  Copy with connections
</Item>
