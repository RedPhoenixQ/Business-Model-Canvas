declare global {
  interface GlobalEventHandlersEventMap {
    "custom-menu-close": CustomEvent<string>;
  }
}

import * as ContextMenu from "$lib/components/ui/context-menu";
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
import * as Menubar from "$lib/components/ui/menubar";

export type MenuType = "context-menu" | "dropdown-menu" | "menubar";

export function menu(type: MenuType) {
  switch (type) {
    case "context-menu":
      return ContextMenu;
    case "dropdown-menu":
      return DropdownMenu;
    case "menubar":
      return Menubar;
    default:
      throw new Error("Invalid menu type: " + type);
  }
}
