<script lang="ts">
  import LMB from "../LMB.svelte";
  import ManagingPages from "../preview/ManagingPages.gif";
  import { PlusIcon } from "lucide-svelte";
</script>

<p>
  Pages can be created by pressing <LMB /> on the
  <i><PlusIcon class="inline-block rounded-md bg-muted p-0.5" size={20} /></i> button
  and selecting one of the templates. Some templates have examples with premade items
  and relations.
</p>
<p>
  To swap between pages, press <LMB /> on the page name. Pressing on the name of
  the current page allows you to rename it.
</p>
<p>
  Deleting and duplicating a page can be done by pressing the <i>Delete</i> or
  <i>Duplicate</i> buttons in the page menu. You will be asked to confirm before
  deleting a page as it's a permanent action.
</p>
<p>
  You can also reorder the pages by choosing the <i>Move to</i> option and pressing
  on another page were you want the page to be at. The page will be placed in the
  position of the page that you choose.
</p>
<figure>
  <img class="m-auto max-h-[50vh]" src={ManagingPages} alt="Managing pages" />
  <figcaption>Managing pages</figcaption>
</figure>
