<script lang="ts">
  import { MoreVerticalIcon, XIcon } from "lucide-svelte";
  import * as Dropdown from "./components/ui/dropdown-menu";
  import { useProject, type Page } from "./project";
  import Button from "./components/ui/button/button.svelte";

  export let i: number;
  export let page: Page;

  const { removePage } = useProject();
</script>

<Dropdown.Root>
  <Dropdown.Trigger asChild let:builder class=" relative z-20 cursor-wait">
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
    <Dropdown.Item
      class="justify-between text-destructive hover:bg-destructive hover:text-destructive-foreground"
      on:click={() => removePage(i)}
    >
      Delete <XIcon />
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>
