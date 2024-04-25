<script lang="ts">
  import { CopyIcon, ScissorsIcon } from "lucide-svelte";
  import { menu, type MenuType } from "../components/custom/menu";
  import { useCopy } from ".";
  import { useSvelteFlow } from "@xyflow/svelte";

  export let type: MenuType;
  export let id: string;

  const { Group, Item, Shortcut } = menu(type);

  const { getNode } = useSvelteFlow();
  const { copy, cut } = useCopy();
</script>

<Group>
  <Item
    class="gap-2"
    on:click={() => {
      const node = getNode(id);
      if (!node) return;
      cut([node]);
    }}
  >
    <ScissorsIcon size={20} />
    Cut
    <Shortcut>Ctrl+X</Shortcut>
  </Item>
  <Item
    class="gap-2"
    on:click={() => {
      const node = getNode(id);
      if (!node) return;
      copy([node]);
    }}
  >
    <CopyIcon size={20} />
    Copy
    <Shortcut>Ctrl+C</Shortcut>
  </Item>
</Group>
