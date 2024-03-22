<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import { SearchIcon, Loader2Icon } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";
  import CustomIcon from "./CustomIcon.svelte";
  import type { IconInfo } from "./index";

  type Icons8Icon = {
    id: string;
    name: string;
    commonName: string;
    category: string;
    platform: string;
    isFree: true;
    isColor: false;
    isExplicit: false;
    authorId: string;
    authorName: string;
    sourceFormat: string;
  };

  type SearchResponse = {
    success: boolean;
    parameters: {
      amount: number;
      countAll: number;
      language: "en";
      foundLanguage: "en";
      offset: number;
      term: string;
      searchTranslations: Record<string, string>;
    };
    icons: Icons8Icon[];
  };
  export let iconInfo: IconInfo;

  const dispatch = createEventDispatcher<{
    iconSelected: Icons8Icon & { src: string };
  }>();

  const Icons8BaseImgUrl = "https://img.icons8.com/?size=100&format=png&id=";

  async function getIcons(term: string) {
    if (!term) {
      icons = [];
      return;
    }
    const url = new URL(
      "https://search-app.icons8.com/api/iconsets/v6/search?term=TERMHERE&amount=10&offset=0&platform=color&language=en-US&authors=all&spellcheck=true&isOuch=true&replaceNameWithSynonyms=true&isAnimated=false",
    );

    url.searchParams.set("term", term);

    const res = await fetch(url);
    const data: SearchResponse = await res.json();
    console.debug("icon search", res, data);
    icons = data.icons;
  }

  let debounce: number | undefined;
  function autoSearch() {
    clearTimeout(debounce);
    debounce = setTimeout(async () => {
      icons = [];
      await getIcons(term);
      debounce = undefined;
    }, 1000);
  }

  let icons: Icons8Icon[] = [];

  let term: string;
</script>

<div class="space-y-4">
  <form
    class="flex w-full max-w-sm items-center space-x-2"
    on:submit|preventDefault={async () => {
      // Cancel autosearch when searching manually
      clearTimeout(debounce);
      await getIcons(term);
      debounce = undefined;
    }}
  >
    <Input bind:value={term} on:input={autoSearch} placeholder="Search for icon"
    ></Input>
    <Button type="submit">
      <span class="sr-only">Search</span>
      <SearchIcon />
    </Button>
  </form>
  <div
    class="grid max-h-32 gap-2 overflow-y-auto rounded border p-1"
    style:grid-template-columns="repeat(auto-fill, minmax(50px, 1fr))"
  >
    {#if icons.length > 0}
      {#each icons as icon}
        {@const src = Icons8BaseImgUrl + icon.id}
        <button on:click={() => dispatch("iconSelected", { ...icon, src })}>
          <CustomIcon
            icon={{ ...iconInfo, iconDefault: undefined, iconSrc: src }}
            alt={icon.name}
          />
        </button>
      {/each}
    {:else if debounce !== undefined}
      <Loader2Icon class="col-span-full mx-auto animate-spin" />
    {:else}
      <div class="col-span-full text-center text-sm text-muted-foreground">
        No results, search for something
      </div>
    {/if}
  </div>
</div>
