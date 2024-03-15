<script lang="ts">
  import { MoonIcon, SunIcon } from "lucide-svelte";
  import * as Menubar from "$lib/components/ui/menubar";
  import { choosenTheme, theme } from "../theme";

  const themes = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];
</script>

<Menubar.Menu>
  <Menubar.Trigger>Settings</Menubar.Trigger>
  <Menubar.Content>
    <!-- Theme -->
    <Menubar.Sub>
      <Menubar.SubTrigger>
        {#if $theme === "dark"}
          <MoonIcon class="mr-2" size="20" />
        {:else}
          <SunIcon class="mr-2" size="20" />
        {/if}
        Theme
      </Menubar.SubTrigger>
      <Menubar.SubContent>
        <Menubar.RadioGroup
          value={$choosenTheme || "system"}
          onValueChange={(value) => {
            $choosenTheme =
              value === "dark" || value === "light" ? value : null;
          }}
        >
          {#each themes as { value, label }}
            <Menubar.RadioItem {value}>{label}</Menubar.RadioItem>
          {/each}
        </Menubar.RadioGroup>
      </Menubar.SubContent>
    </Menubar.Sub>
  </Menubar.Content>
</Menubar.Menu>
