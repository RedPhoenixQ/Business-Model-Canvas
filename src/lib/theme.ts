import {
  derived,
  writable,
  type Writable,
  readable,
  type Readable,
} from "svelte/store";

export type Themes = "dark" | "light";

const savedTheme = localStorage.getItem("theme");
export const choosenTheme: Writable<Themes | null> = writable(
  savedTheme === "dark" || savedTheme === "light" ? savedTheme : null,
);
choosenTheme.subscribe((val) => {
  // Persist theme settings to localStorage
  if (val) {
    localStorage.setItem("theme", val);
  } else {
    localStorage.removeItem("theme");
  }
});

const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
const preferedTheme: Readable<Themes> = readable(
  darkModePreference.matches ? "dark" : "light",
  (set) => {
    function onPreferenceChange(event: MediaQueryListEvent) {
      console.log("preference change", event);
      set(event.matches ? "dark" : "light");
    }
    darkModePreference.addEventListener("change", onPreferenceChange);
    return () => {
      darkModePreference.removeEventListener("change", onPreferenceChange);
    };
  },
);

export const theme: Readable<Themes> = derived(
  [choosenTheme, preferedTheme],
  ([$choosenTheme, $preferedTheme]) => {
    return ($choosenTheme ?? $preferedTheme) as "dark" | "light";
  },
);
theme.subscribe((val) => {
  // Set dark class for tailwind based on theme
  if (val === "dark") {
    console.log("setting dark");
    document.documentElement.classList.add("dark");
  } else {
    console.log("removing dark");
    document.documentElement.classList.remove("dark");
  }
});
