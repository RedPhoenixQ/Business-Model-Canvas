<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import { theme } from "./theme";

  const items = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];
</script>

<Select.Root
  selected={items.find((i) => i.value === ($theme ?? "system"))}
  {items}
  onSelectedChange={(event) => {
    $theme =
      event?.value === "dark" || event?.value === "light" ? event.value : null;
  }}
>
  <Select.Trigger class="w-24" aria-label="Theme" title="theme">
    <Select.Value placeholder="Theme" />
  </Select.Trigger>
  <Select.Content>
    {#each items as { value, label }}
      <Select.Item {value} {label}>{label}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
