<script>
  import * as Dialog from "$lib/components/ui/dialog";
  import EditItem from "./preview/EditItem.svelte";
  import ChangeIcon from "./preview/ChangeIcon.svelte";
  import RightMouse from "$lib/icons/RightMouse.svelte";
  import LeftMouse from "$lib/icons/LeftMouse.svelte";
  import AddingAndRemovingItems from "./preview/AddingAndRemovingItems.svelte";
  import AddRemoveRelations from "./preview/AddRemoveRelations.svelte";
  import RelationshipText from "./preview/RelationshipText.svelte";
  import RecommendedRelation from "./preview/RecommendedRelation.svelte";
  import MovingBetweenSegments from "./preview/MovingBetweenSegments.svelte";

  export let open = false;
</script>

<Dialog.Root bind:open>
  <Dialog.Content
    class="max-h-[90vh] overflow-auto md:max-w-screen-sm lg:max-w-screen-md"
  >
    <Dialog.Header>
      <Dialog.Title level="h2">Quickstart guide</Dialog.Title>
    </Dialog.Header>
    <div
      class="space-y-8 [&>section]:space-y-6 [&_aside]:opacity-75 [&_figure]:space-y-1 [&_figure]:text-center [&_figure]:text-sm [&_figure]:italic [&_h3]:text-xl [&_h3]:font-semibold [&_h4]:font-semibold [&_kbd]:whitespace-nowrap [&_kbd]:rounded-sm [&_kbd]:border [&_kbd]:border-current [&_kbd]:bg-muted [&_kbd]:px-1 [&_kbd]:py-0.5 [&_kbd]:text-[0.9em] [&_kbd]:text-muted-foreground [&_section_section]:space-y-2"
    >
      <section>
        <h3>Items</h3>
        <section>
          <h4>Adding And Removing Items</h4>
          <p>
            Clicking
            <kbd><RightMouse class="inline-block" size={20} />right mouse</kbd>
            anywhere in the background will open up a menu were different types of
            items can be added.
          </p>
          <p>
            There are two options for removing an item. You can click
            <kbd><RightMouse class="inline-block" size={20} />right mouse</kbd>
            the item and choose <i>delete</i>. Optionally you can select the
            item by clicking
            <kbd><LeftMouse class="inline-block" size={20} />left mouse</kbd>
            on it and pressing either <kbd>Delete</kbd> or
            <kbd>Backspace</kbd> on the keyboard.
          </p>
          <figure>
            <AddingAndRemovingItems class="m-auto max-h-[50vh]" />
            <figcaption>Editing the name and description on an item</figcaption>
          </figure>
        </section>
        <section>
          <h4>Moving And Moving Between Segments</h4>
          <p>
            To move and item you press
            <kbd><LeftMouse class="inline-block" size={20} />left mouse</kbd>
            and drag. If the items is within a segment or group, it is restricted
            to stay within that segment or group.
          </p>
          <p>
            Moving between groups or segments can be achived by toggling the
            restrictions in the <i>controls</i> at the bottom left. When dropping
            an item in a new segment or group, it's now part of it. Toggling back
            on the restrictions will keep it within the new segment or group.
          </p>
          <p>
            Another option to move between segments is to click
            <kbd><RightMouse class="inline-block" size={20} />right mouse</kbd>
            on the item and in the <i>Move To</i> option select the segments you
            wish to move the item to.
          </p>
          <figure>
            <MovingBetweenSegments class="m-auto max-h-[50vh]" />
            <figcaption>
              Moving an item between segments. Note the recommened relations
              changing when the segment changes.
            </figcaption>
          </figure>
        </section>
        <section>
          <h4>Editing Items</h4>
          <p>
            Clicking
            <kbd><RightMouse class="inline-block" size={20} />right mouse</kbd>
            on an item and pressing <i>Edit</i> opens the editing menu where things
            about the item can be changed.
          </p>
          <figure>
            <EditItem class="m-auto max-h-[50vh]" />
            <figcaption>Editing the name and description on an item</figcaption>
          </figure>
        </section>
        <section>
          <h4>Changing Icons</h4>
          <p>
            Pressing on the icon in the edit pane will open up settings for the
            items icon. Here you can set the background and shape, choose from
            available preset icons or search for and icon. Optionally you can
            paste your own link to an image that is available online.
          </p>
          <figure>
            <ChangeIcon class="m-auto" />
            <figcaption>Changing the icon by searching</figcaption>
          </figure>
        </section>
      </section>

      <section>
        <h3>Relations</h3>
        <section>
          <h4>Adding And Removing Relations</h4>
          <p>
            To add a relation between items, click and drag from the grey dot
            that appears at edge of any item and then let go with the mouse on
            top of any other item.
          </p>
          <p>
            Relations are automatically hidden if you are not hovering the item.
            Click
            <kbd><LeftMouse class="inline-block" size={20} />left mouse</kbd>
            to select and item to show the relations when not hovering it. Press
            <kbd>Ctrl</kbd> +
            <kbd><LeftMouse class="inline-block" size={20} />left mouse</kbd> on
            another item to select multiple items at the same time.
          </p>
          <p>
            To remove a relationship, you can press
            <kbd><LeftMouse class="inline-block" size={20} />left mouse</kbd>
            on the relationship line and while its highlighted, press
            <kbd>Delete</kbd>
            or <kbd>Backspace</kbd>.
          </p>
          <figure>
            <AddRemoveRelations class="m-auto" />
            <figcaption>
              Adding and removing a relation between to items
            </figcaption>
          </figure>
        </section>
        <section>
          <h4>Recommended Relations</h4>
          <p>
            Segments in a diagram layout can have recommended relations to items
            in other segments. When these relations are not present a small
            warning icon i shown on the item.
          </p>
          <p>
            Recommended relations can be ignored by pressing
            <kbd><LeftMouse class="inline-block" size={20} />left mouse</kbd>
            on the warning icon to show the recommendations and then pressing
            <kbd><LeftMouse class="inline-block" size={20} />left mouse</kbd>
            on any of the segment names. The recommended relations shouldn't all
            be ignored unless there is good reasons for it, perhaps that it wouldn't
            make sense for a certain item.
          </p>
          <aside>
            Note: In the <i>controls</i> on the bottom left there is a button to
            hide all relation warnings. This might be usefull while the diagram is
            incompete to reduce the visual noise.
          </aside>
          <figure>
            <RecommendedRelation class="m-auto" />
            <figcaption>
              Items in <i>Key Activites</i> has recommended relations to
              <i>Key Resource</i>
              OR <i>Key Support</i>
            </figcaption>
          </figure>
        </section>
        <section>
          <h4>Adding Text To Relations</h4>
          <p>
            A relationship can be given a label by opening the edit menu of
            either item in the relation and adding text in the
            <i>connections</i> section.
          </p>
          <aside>
            <p>
              Note: In the <i>connections</i> section you can also remove
              relations by pressing the <i>X</i> button.
            </p>
            <p>
              Note: You can also go to the edit menu of related items by
              clicking
              <kbd><LeftMouse class="inline-block" size={20} />left mouse</kbd>
              on their icons.
            </p>
          </aside>
          <figure>
            <RelationshipText class="m-auto" />
            <figcaption>Adding text to a relationsship</figcaption>
          </figure>
        </section>
      </section>
    </div>
  </Dialog.Content>
</Dialog.Root>
