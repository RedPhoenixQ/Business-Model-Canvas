<script lang="ts">
  import { CopyIcon, ScissorsIcon } from "lucide-svelte";
  import { menu, type MenuType } from "../components/custom/menu";
  import { useCopy } from ".";

  export let type: MenuType;
  export let id: string;

  const { Item } = menu(type);

  const { copy, cut } = useCopy();
</script>

<svelte:window on:paste={console.log} />

<Item on:click={() => cut(id)}>
  <ScissorsIcon size={20} class="mr-2" />
  Cut
</Item>
<Item on:click={() => copy(id)}>
  <CopyIcon size={20} class="mr-2" />
  Copy
</Item>
<Item on:click={() => copy(id, true)}>
  <CopyIcon size={20} class="mr-2" />
  Copy with connections
</Item>
