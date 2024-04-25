<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import { BugIcon } from "lucide-svelte";
  import GithubIcon from "../icons/GithubIcon.svelte";
  import QuickstartQuide from "$lib/info/quide/QuickstartQuide.svelte";

  let open = false;
</script>

<QuickstartQuide bind:open />

<Menubar.Menu>
  <Menubar.Trigger>Help</Menubar.Trigger>
  <Menubar.Content>
    <Menubar.Item class="gap-2" on:click={() => (open = true)}>
      Quickstart guide
    </Menubar.Item>
    <Menubar.Separator />
    <Menubar.Item class="gap-2" href="mailto:redphoenixq@gmail.com">
      <BugIcon size={20} />
      Report issue (email)
    </Menubar.Item>
    <Menubar.Item
      class="gap-2"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Github project link"
      href="https://github.com/RedPhoenixQ/Business-Model-Canvas"
    >
      <GithubIcon size={20} />
      Github
    </Menubar.Item>
    <Menubar.Separator />
    <Menubar.Group>
      <Menubar.Label>About</Menubar.Label>
      <div class="text-small px-2 py-1 text-sm text-muted-foreground">
        Icons by <a
          class="underline"
          href="https://icons8.com/"
          target="_blank"
          rel="noopener noreferrer">Icons8</a
        >
      </div>
      <!-- svelte-ignore missing-declaration -->
      <div class="text-small px-2 py-1 text-sm text-muted-foreground">
        Version {APP_VERSION}
      </div>
    </Menubar.Group>
  </Menubar.Content>
</Menubar.Menu>
