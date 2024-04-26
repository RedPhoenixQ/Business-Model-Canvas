<script lang="ts">
  import { MoreVerticalIcon, XIcon, CopyPlusIcon } from "lucide-svelte";
  import * as Dropdown from "../components/ui/dropdown-menu";
  import { useProject, type SavedPage, canRemovePages } from ".";
  import Button from "../components/ui/button/button.svelte";

  export let page: SavedPage;
  export let i: number;

  const { duplicatePage, removePage } = useProject();
</script>

<Dropdown.Root>
  <Dropdown.Trigger asChild let:builder class="relative z-20 cursor-wait">
    <Button
      variant="ghost"
      size="sm"
      class="rounded-full p-0 hover:bg-transparent hover:text-current"
      builders={[builder]}
      on:click={(event) => {
        event.stopPropagation();
      }}
    >
      <MoreVerticalIcon />
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item class="gap-2" on:click={() => duplicatePage(i)}>
      <CopyPlusIcon size="20" />
      Duplicate
    </Dropdown.Item>
    {#if $canRemovePages}
      <Dropdown.Separator />
      <Dropdown.Item
        class="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        on:click={() => {
          if (
            confirm(`Do you want to permanently delete "${page.data.name}"?`)
          ) {
            removePage(i);
          }
        }}
      >
        <XIcon size="20" />
        Delete
      </Dropdown.Item>
    {/if}
  </Dropdown.Content>
</Dropdown.Root>
