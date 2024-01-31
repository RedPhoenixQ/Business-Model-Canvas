import type { Action } from "svelte/action";

type Position = {
  x: number;
  y: number;
};

export const movable: Action<
  HTMLElement,
  Position | undefined,
  { "on:moving": (event: CustomEvent<Position>) => void }
> = (node, pos = { x: 0, y: 0 }) => {
  let moving = false;

  node.style.userSelect = "none";
  node.style.cursor = "grab";
  node.style.position = "absolute";

  function onStart(e: PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    node.style.cursor = "grabbing";
    moving = true;
  }

  function onMove(e: PointerEvent) {
    if (moving) {
      pos.x += e.movementX;
      pos.y += e.movementY;
      node.style.left = `${pos.x}px`;
      node.style.top = `${pos.y}px`;
      node.dispatchEvent(new CustomEvent<Position>("moving", { detail: pos }));
    }
  }

  function onEnd() {
    moving = false;
    node.style.cursor = "grab";
  }

  // Register handlers
  node.addEventListener("pointerdown", onStart);

  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onEnd);
  window.addEventListener("pointercancel", onEnd);

  return {
    destroy() {
      // Cleanup all handlers
      node.removeEventListener("pointerdown", onStart);

      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
    },
  };
};
