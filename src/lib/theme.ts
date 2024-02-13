// On page load or when changing themes, best to add inline in `head` to avoid FOUC
export function initTheme() {
  const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
  setTheme(darkModePreference.matches);

  // recommended method for newer browsers: specify event-type as first argument
  darkModePreference.addEventListener("change", onPreferenceChange);
  return () => {
    darkModePreference.removeEventListener("change", onPreferenceChange);
  };
}

function onPreferenceChange(event: MediaQueryListEvent) {
  setTheme(event.matches);
}

function setTheme(dark: boolean) {
  if (localStorage.theme === "dark" || (!("theme" in localStorage) && dark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// Whenever the user explicitly chooses light mode
//   localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
//   localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
//   localStorage.removeItem('theme')
