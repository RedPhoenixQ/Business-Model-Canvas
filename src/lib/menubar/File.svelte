<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import { useSave } from "$lib/save";

  const { save, download_file, load } = useSave();
</script>

<Menubar.Menu>
  <Menubar.Trigger>File</Menubar.Trigger>
  <Menubar.Content class="min-w-fit">
    <Menubar.Item
      on:click={() => {
        const input = prompt("input");
        if (input === null) return;
        load(input);
      }}>Open</Menubar.Item
    >
    <Menubar.Item on:click={() => navigator.clipboard.writeText(save())}>
      Copy to Clipboard
    </Menubar.Item>
    <Menubar.Item on:click={download_file}>Download</Menubar.Item>
  </Menubar.Content>
</Menubar.Menu>
<!-- <Button on:click={save}>Save</Button>
<Button on:click={load}>Load</Button> -->
