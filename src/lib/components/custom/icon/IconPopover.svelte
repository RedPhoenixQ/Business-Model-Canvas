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

  const background: { label: string; value: IconInfo["background"] }[] = [
    { label: "None", value: undefined },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];
  const shape: { label: string; value: IconInfo["shape"] }[] = [
    { label: "Square", value: "square" },
    { label: "Circle", value: "circle" },
  ];
  const defaultIcons: { label: string; value: IconInfo["default"] }[] =
    Object.keys(predefinedIcons).map((value) => {
      return { label: value, value: value as IconInfo["default"] };
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
          items={background}
          selected={background.find(({ value }) => value === icon?.background)}
          onSelectedChange={(selected) => {
            icon.background = selected?.value;
            dispatch("change", "background");
          }}
        >
          <Select.Trigger>
            <Select.Value class="capitalize" />
          </Select.Trigger>
          <Select.Content>
            {#each background as { value, label }}
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
          items={shape}
          selected={shape.find(({ value }) => value === icon?.shape) ??
            shape[0]}
          onSelectedChange={(selected) => {
            icon.shape = selected?.value;
            dispatch("change", "shape");
          }}
        >
          <Select.Trigger>
            <Select.Value class="capitalize" />
          </Select.Trigger>
          <Select.Content>
            {#each shape as { value, label }}
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
        selected={defaultIcons.find(({ value }) => value === icon?.default)}
        onSelectedChange={(selected) => {
          icon.default = selected?.value;
          dispatch("change", "default");
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
    {#if !icon.default}
      <Label class="block space-y-2">
        <span> Icon Link </span>
        <Input
          type="url"
          bind:value={icon.src}
          on:change={() => dispatch("change", "src")}
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
          icon.default = undefined;
          icon.src = event.detail.src;
          dispatch("change", "src");
        }}
      />
    </div>
  </Popover.Content>
</Popover.Root>
