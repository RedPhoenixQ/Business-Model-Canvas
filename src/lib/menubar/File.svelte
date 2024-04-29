<script lang="ts">
  import {
    FileOutputIcon,
    ClipboardCopyIcon,
    ClipboardPasteIcon,
    FileInputIcon,
    PlusIcon,
  } from "lucide-svelte/icons";
  import * as Menubar from "$lib/components/ui/menubar";
  import { useProject } from "$lib/project/index";
  import { projectTemplates } from "$lib/info/templates";
  import { useFile } from "$lib/project/file";

  const { fromJSON, toJSON, newProject } = useProject();
  const { openFile, saveFile, saveFileAs } = useFile();

  const projectTemplateKeys = Object.keys(
    projectTemplates,
  ) as (keyof typeof projectTemplates)[];
</script>

<Menubar.Menu>
  <Menubar.Trigger>File</Menubar.Trigger>
  <Menubar.Content>
    <Menubar.Sub>
      <Menubar.SubTrigger class="gap-2">
        <PlusIcon size="20" />
        New
      </Menubar.SubTrigger>
      <Menubar.SubContent>
        <Menubar.Label>Template</Menubar.Label>
        {#each projectTemplateKeys as template}
          <Menubar.Item
            class="capitalize"
            on:click={() => {
              if (
                confirm(
                  "Are you sure you want to create a new project?\n\nAll unsaved progress will be lost!",
                )
              ) {
                newProject(template);
              }
            }}
          >
            {template.replace("-", " ")}
          </Menubar.Item>
        {/each}
      </Menubar.SubContent>
    </Menubar.Sub>

    <Menubar.Separator />
    <Menubar.Group>
      <Menubar.Item
        class="gap-2"
        on:click={() => {
          if (
            confirm(
              "Are you sure you want to open a file?\n\nAll unsaved progress will be lost!",
            )
          ) {
            openFile();
          }
        }}
      >
        <FileInputIcon size="20" />
        Open file
      </Menubar.Item>
      <Menubar.Item class="gap-2" on:click={() => saveFile()}>
        <FileOutputIcon size="20" />
        Save
      </Menubar.Item>
      <Menubar.Item class="gap-2" on:click={() => saveFileAs()}>
        <FileOutputIcon size="20" />
        Save As...
      </Menubar.Item>
    </Menubar.Group>

    <Menubar.Separator />
    <Menubar.Group>
      <Menubar.Item
        class="gap-2"
        on:click={() => {
          const input = prompt("input");
          if (input === null) return;
          fromJSON(input);
        }}
      >
        <ClipboardPasteIcon size="20" />
        Open from clipboard
      </Menubar.Item>
      <Menubar.Item
        class="gap-2"
        on:click={() => navigator.clipboard.writeText(toJSON())}
      >
        <ClipboardCopyIcon size="20" />
        Copy to Clipboard
      </Menubar.Item>
    </Menubar.Group>
  </Menubar.Content>
</Menubar.Menu>
