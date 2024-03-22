<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import IconSearch from "./IconSearch.svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";
  import { createEventDispatcher } from "svelte";
  import { predefinedIcons, type IconInfo } from "./index";

  export let icon: IconInfo;

  const dispatch = createEventDispatcher<{
    close: undefined;
    change: keyof IconInfo;
  }>();

  const iconBackground: { label: string; value: IconInfo["iconBackground"] }[] =
    [
      { label: "None", value: undefined },
      { label: "Light", value: "light" },
      { label: "Dark", value: "dark" },
    ];
  const iconShape: { label: string; value: IconInfo["iconShape"] }[] = [
    { label: "Square", value: "square" },
    { label: "Circle", value: "circle" },
  ];
  const defaultIcons: { label: string; value: IconInfo["iconDefault"] }[] =
    Object.keys(predefinedIcons).map((value) => {
      return { label: value, value: value as IconInfo["iconDefault"] };
    });
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
          )}
          onSelectedChange={(selected) => {
            icon.iconBackground = selected?.value;
            dispatch("change", "iconBackground");
          }}
        >
          <Select.Trigger>
            <Select.Value class="capitalize" />
          </Select.Trigger>
          <Select.Content>
            {#each iconBackground as { value, label }}
              <Select.Item
                {value}
                on:click={(e) => e.detail.originalEvent.preventDefault()}
              >
                {label}
              </Select.Item>
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
            icon.iconShape = selected?.value;
            dispatch("change", "iconShape");
          }}
        >
          <Select.Trigger>
            <Select.Value class="capitalize" />
          </Select.Trigger>
          <Select.Content>
            {#each iconShape as { value, label }}
              <Select.Item
                {value}
                on:click={(e) => e.detail.originalEvent.preventDefault()}
              >
                {label}
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </Label>
    </div>
    <Label class="block space-y-2">
      <span>Default icon</span>
      <Select.Root
        items={defaultIcons}
        selected={defaultIcons.find(({ value }) => value === icon?.iconDefault)}
        onSelectedChange={(selected) => {
          icon.iconDefault = selected?.value;
          dispatch("change", "iconDefault");
        }}
      >
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Content>
          <Select.Item
            value={undefined}
            on:click={(e) => e.detail.originalEvent.preventDefault()}
          >
            Custom link
          </Select.Item>
          {#each defaultIcons as { value, label }}
            <Select.Item
              {value}
              on:click={(e) => e.detail.originalEvent.preventDefault()}
            >
              {label}
            </Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </Label>
    {#if !icon.iconDefault}
      <Label class="block space-y-2">
        <span> Icon Link </span>
        <Input
          type="url"
          bind:value={icon.iconSrc}
          on:change={() => dispatch("change", "iconSrc")}
          on:keydown={(e) => e.stopPropagation()}
        />
      </Label>
    {/if}

    <div class="space-y-2 text-sm font-medium leading-none">
      <span>Search</span>
      <IconSearch
        iconInfo={icon}
        on:iconSelected={(event) => {
          console.debug("iconSelected", event.detail);
          icon.iconDefault = undefined;
          icon.iconSrc = event.detail.src;
          dispatch("change", "iconSrc");
        }}
      />
    </div>
  </Popover.Content>
</Popover.Root>