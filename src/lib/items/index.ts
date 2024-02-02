import { writable, type Writable } from "svelte/store";

export type ItemId = string;
export type Item = {
  id: ItemId;
  x: number;
  y: number;
  name: string;
  icon?: string;
  relations: ItemId[];
};

export const selectedItem: Writable<Item | undefined> = writable();
selectedItem.subscribe(console.debug);

export const items: Writable<Map<ItemId, Item>> = writable(
  new Map([
    [
      "asdf1234",
      {
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
        name: "Steam",
        id: "asdf1234",
        x: 120,
        y: 153,
        relations: ["1234asdf"],
      },
    ],
    [
      "1234asdf",
      {
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
        name: "Steam",
        id: "1234asdf",
        x: 20,
        y: 423,
        relations: [],
      },
    ],
  ]),
);
// TODO: Save items to localstorage and load them on page start.
//       Optionally save as file and allow file upload
