import { writable, type Writable } from "svelte/store";

const savedTheme = localStorage.getItem("theme");
export const theme: Writable<"dark" | "light" | null> = writable(
  savedTheme === "dark" || savedTheme === "light" ? savedTheme : null,
);

// Persist theme settings to localStorage
theme.subscribe((val) => {
  if (val) {
    localStorage.setItem("theme", val);
  } else {
    localStorage.removeItem("theme");
  }
});

export function initTheme() {
  const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
  let prefersDarkMode = darkModePreference.matches;
  function onPreferenceChange(event: MediaQueryListEvent) {
    console.log("preference change", event);
    prefersDarkMode = event.matches;
    setTheme();
  }
  darkModePreference.addEventListener("change", onPreferenceChange);

  let currentTheme: string | null = null;
  const cleanupThemeSub = theme.subscribe((val) => {
    currentTheme = val;
    setTheme();
  });

  function setTheme() {
    if (currentTheme ? currentTheme === "dark" : prefersDarkMode) {
      console.log("setting dark");
      document.documentElement.classList.add("dark");
    } else {
      console.log("removing dark");
      document.documentElement.classList.remove("dark");
    }
  }
  setTheme();

  return () => {
    darkModePreference.removeEventListener("change", onPreferenceChange);
    cleanupThemeSub();
  };
}
