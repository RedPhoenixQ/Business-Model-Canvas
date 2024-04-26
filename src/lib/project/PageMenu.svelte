<script lang="ts">
  import {
    MoreVerticalIcon,
    XIcon,
    CopyPlusIcon,
    ArrowLeftRightIcon,
  } from "lucide-svelte";
  import * as Dropdown from "../components/ui/dropdown-menu";
  import { useProject, type SavedPage, canRemovePages, projectStore } from ".";
  import Button from "../components/ui/button/button.svelte";
  export let page: SavedPage;
  export let i: number;

  const { duplicatePage, removePage, movePage } = useProject();
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
    <Dropdown.Separator />
    <Dropdown.Sub>
      <Dropdown.SubTrigger class="gap-2">
        <ArrowLeftRightIcon size="20" />
        Move to
      </Dropdown.SubTrigger>
      <Dropdown.SubContent>
        {#each $projectStore.pages as otherPage, to}
          <Dropdown.Item on:click={() => movePage(i, to)} disabled={i === to}>
            {otherPage.data.name}
          </Dropdown.Item>
        {/each}
      </Dropdown.SubContent>
    </Dropdown.Sub>
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
