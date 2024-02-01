import type { Action } from "svelte/action";

type Position = {
  x: number;
  y: number;
};

export const movable: Action<
  HTMLElement,
  { pos: Position; enabled: boolean },
  { "on:moving": (event: CustomEvent<Position>) => void }
> = (node, { pos, enabled } = { pos: { x: 0, y: 0 }, enabled: true }) => {
  let moving = false;

  node.style.userSelect = "none";
  node.style.position = "absolute";
  setCursor();

  function setCursor() {
    if (enabled) {
      node.style.cursor = "grab";
    } else {
      node.style.cursor = "pointer";
    }
  }

  function onStart(e: PointerEvent) {
    if (!enabled || (e.pointerType === "mouse" && e.button !== 0)) return;
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
    if (!moving) return;
    moving = false;
    setCursor();
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
    update(params) {
      enabled = params.enabled;
      setCursor();
    },
  };
};
