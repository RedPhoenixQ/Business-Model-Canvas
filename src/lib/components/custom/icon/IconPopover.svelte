<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import IconSearch from "./IconSearch.svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";
  import { createEventDispatcher } from "svelte";
  import type { IconInfo } from "./index";

  export let icon: IconInfo;

  const dispatch = createEventDispatcher<{
    close: undefined;
    change: keyof IconInfo;
  }>();

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

<Popover.Root
  onOpenChange={(is_open) => {
    if (!is_open) dispatch("close");
  }}
>
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
            ({ value }) => value === icon?.iconBackground,
          ) ?? iconBackground[0]}
          onSelectedChange={(selected) => {
            if (!selected) return;
            const value = selected.value;
            icon.iconBackground =
              value === "light" || value === "dark" ? value : undefined;
            dispatch("change", "iconBackground");
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
          selected={iconShape.find(({ value }) => value === icon?.iconShape) ??
            iconShape[0]}
          onSelectedChange={(selected) => {
            if (!selected) return;
            const value = selected.value;
            icon.iconShape =
              value === "circle" || value === "square" ? value : undefined;
            dispatch("change", "iconShape");
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
        <Input type="url" bind:value={icon.iconSrc} />
      </Label>
    </div>
    <div class="space-y-2 text-sm font-medium leading-none">
      <span>Search</span>
      <IconSearch
        iconInfo={icon}
        on:iconSelected={(event) => {
          console.debug("iconSelected", event.detail);
          icon.iconSrc = event.detail.src;
          dispatch("change", "iconSrc");
        }}
      />
    </div>
  </Popover.Content>
</Popover.Root>
