import {
  showSaveFilePicker,
  showOpenFilePicker,
  FileSystemFileHandle,
} from "native-file-system-adapter";
import { handleStore, projectStore, useProject } from ".";
import { derived, get, writable, type Writable } from "svelte/store";
import { lastEntry, type HistoryEntry } from "./history";

const types = [{ accept: { "application/json": [".json"] } }];

const lastSavedEntryStore: Writable<HistoryEntry | undefined> = writable();

const supportsFileAPIWrites = "showSaveFilePicker" in window;
export const savedStore = derived(
  [lastEntry, lastSavedEntryStore, handleStore],
  ([$lastEntry, $lastSaved, $handle]) => {
    if ($lastEntry !== $lastSaved) {
      return "unsaved";
    } else if (supportsFileAPIWrites && $handle) {
      return "file";
    } else {
      return "local";
    }
  },
);

export function useFile() {
  const { toJSON, fromJSON } = useProject();

  /**If the browser doesn't support writes to file, a download with the name
   * of the handle will be started instead. */
  async function writeToHandle(json: string): Promise<boolean> {
    const $handle = get(handleStore);
    if (!$handle) return false;
    try {
      const writable = await $handle.createWritable();
      const blob = new Blob([json], {
        type: "application/json",
      });
      await blob.stream().pipeTo(writable);
      return true;
    } catch (err) {
      console.error(err);
      handleStore.set(undefined);
      return false;
    }
  }

  async function loadFromHandle(handle: FileSystemFileHandle) {
    const file = await handle.getFile();
    if (!file) return console.error("Could not access file from handle");
    handleStore.set(handle);
    fromJSON(await file.text());
  }

  function saveLocal(json = toJSON()) {
    localStorage.setItem("save", json);
    lastSavedEntryStore.set(get(lastEntry));
  }

  async function loadLocal() {
    const json = localStorage.getItem("save");
    if (!json) return;
    try {
      fromJSON(json);
    } catch (err) {
      console.error("From local storage load", err);
    }
  }

  async function saveFile(json: string = toJSON()) {
    if (!(await writeToHandle(json))) {
      saveFileAs(json);
    }
  }

  async function saveAll(json: string = toJSON()) {
    saveLocal(json);
    if (supportsFileAPIWrites) writeToHandle(json);
  }

  async function saveFileAs(json: string = toJSON()) {
    let name = get(projectStore).name;
    if (!supportsFileAPIWrites) {
      name = prompt("Please enter a file name") || name;
    }
    const handle = await showSaveFilePicker({
      _preferPolyfill: false,
      _name: `${name ?? "unnamed"}.json`,
      suggestedName: `${name ?? "unnamed"}.json`,
      excludeAcceptAllOption: true,
      types,
      //@ts-expect-error: Exists in the native api on chrome
      startIn: "documents",
      id: "FileHandler",
    });
    handleStore.set(handle);
    saveLocal(json);
    writeToHandle(json);
  }

  async function openFile() {
    const [handle] = await showOpenFilePicker({
      _preferPolyfill: false,
      excludeAcceptAllOption: true,
      accepts: [{ mimeTypes: ["application/json"] }],
      multiple: false,
      //@ts-expect-error: Exists in the native api on chrome
      startIn: "documents",
      types,
      id: "FileHandler",
    });
    if (!handle) return console.error("No file choosen", handle);
    loadFromHandle(handle);
  }

  return {
    loadFromHandle,
    saveLocal,
    loadLocal,
    openFile,
    saveFile,
    saveFileAs,
    saveAll,
  };
}
