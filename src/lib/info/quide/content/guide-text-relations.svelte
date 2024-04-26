<script lang="ts">
  import LMB from "../LMB.svelte";
  import RelationshipText from "../preview/RelationText.gif";
</script>

<p>
  A relationship can be given a label by opening the edit menu of either item in
  the relation and adding text in the <i>connections</i> section.
</p>
<aside>
  <p>
    Note: In the <i>connections</i> section you can also remove relations by
    pressing the <i>X</i> button.
  </p>
  <p>
    Note: You can also go to the edit menu of related items by clicking <LMB /> on
    their icons.
  </p>
</aside>
<figure>
  <img
    class="m-auto max-h-[50vh]"
    src={RelationshipText}
    alt="Adding text to a relationship"
  />
  <figcaption>Adding text to a relationsship</figcaption>
</figure>
