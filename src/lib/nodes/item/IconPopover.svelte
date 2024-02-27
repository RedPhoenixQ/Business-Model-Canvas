<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import { type ItemData } from ".";
  import IconSearch from "./IconSearch.svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";

  export let data: ItemData;

  const iconBackground = [
    { label: "None", value: "none" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];
  const iconShape = [
    { label: "Square", value: "square" },
    { label: "Circle", value: "circle" },
  ];
</script>

<Popover.Root>
  <Popover.Trigger {...$$restProps}>
    <slot />
  </Popover.Trigger>
  <Popover.Content side="right" sideOffset={20} class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <Label class="space-y-2">
        <span>Background</span>
        <Select.Root
          items={iconBackground}
          selected={iconBackground.find(
            ({ value }) => value === data?.icon?.background,
          ) ?? iconBackground[0]}
          onSelectedChange={(selected) => {
            if (!data || !selected) return;
            const value = selected.value;
            data.icon.background =
              value === "light" || value === "dark" ? value : undefined;
          }}
        >
          <Select.Trigger>
            <Select.Value class="capitalize" />
          </Select.Trigger>
          <Select.Content>
            {#each iconBackground as { value, label }}
              <Select.Item {value}>{label}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </Label>
      <Label class="space-y-2">
        <span>Shape</span>
        <Select.Root
          items={iconShape}
          selected={iconShape.find(
            ({ value }) => value === data?.icon?.shape,
          ) ?? iconShape[0]}
          onSelectedChange={(selected) => {
            if (!data || !selected) return;
            const value = selected.value;
            data.icon.shape =
              value === "circle" || value === "square" ? value : undefined;
          }}
        >
          <Select.Trigger>
            <Select.Value class="capitalize" />
          </Select.Trigger>
          <Select.Content>
            {#each iconShape as { value, label }}
              <Select.Item {value}>{label}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </Label>
    </div>
    <div>
      <Label class="space-y-2">
        <span> Icon Link </span>
        <Input type="url" bind:value={data.icon.src} />
      </Label>
    </div>
    <div class="space-y-2 text-sm font-medium leading-none">
      <span>Search</span>
      <IconSearch
        iconInfo={data.icon}
        on:iconSelected={(event) => {
          console.log("iconSelected", event.detail);
          if (!data) return;
          data.icon.src = event.detail.src;
        }}
      />
    </div>
  </Popover.Content>
</Popover.Root>
