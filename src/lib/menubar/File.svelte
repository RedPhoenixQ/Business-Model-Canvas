<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import { useProject } from "$lib/project";

  const { toJSON, fromJSON, newProject } = useProject();

  function downloadFile() {
    const blob = new Blob([toJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    // Create a one-time link element for downloading
    const dlink = document.createElement("a");
    // TODO: Get project name from somewere
    dlink.download = "Test name.json";
    dlink.href = url;
    dlink.click();
    dlink.remove();
    URL.revokeObjectURL(url);
  }
</script>

<Menubar.Menu>
  <Menubar.Trigger>File</Menubar.Trigger>
  <Menubar.Content class="min-w-fit">
    <Menubar.Sub>
      <Menubar.SubTrigger>New</Menubar.SubTrigger>
      <Menubar.SubContent>
        <Menubar.Label>Template</Menubar.Label>
        <Menubar.Item
          on:click={() =>
            // TODO: Prompt for saving old project first
            newProject("default")}>Default</Menubar.Item
        >
        <Menubar.Item on:click={() => newProject("empty")}>Empty</Menubar.Item>
      </Menubar.SubContent>
    </Menubar.Sub>
    <Menubar.Separator />
    <Menubar.Item
      on:click={() => {
        const input = prompt("input");
        if (input === null) return;
        fromJSON(input);
      }}>Open</Menubar.Item
    >
    <Menubar.Separator />
    <Menubar.Item on:click={() => navigator.clipboard.writeText(toJSON())}>
      Copy to Clipboard
    </Menubar.Item>
    <Menubar.Item on:click={downloadFile}>Download</Menubar.Item>
  </Menubar.Content>
</Menubar.Menu>
<!-- <Button on:click={save}>Save</Button>
<Button on:click={load}>Load</Button> -->
