<script lang="ts">
  import { MoreVerticalIcon, XIcon, CopyPlusIcon } from "lucide-svelte";
  import * as Dropdown from "../components/ui/dropdown-menu";
  import { useProject } from ".";
  import Button from "../components/ui/button/button.svelte";

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
        console.log(event);
        event.stopPropagation();
      }}
    >
      <MoreVerticalIcon />
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item on:click={() => duplicatePage(i)}>
      <CopyPlusIcon class="mr-2" size="20" />
      Duplicate
    </Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item
      class="text-destructive hover:bg-destructive hover:text-destructive-foreground"
      on:click={() => removePage(i)}
    >
      <XIcon class="mr-2" size="20" />
      Delete
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>
