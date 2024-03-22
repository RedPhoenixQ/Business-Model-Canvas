import "./app.pcss";
import Main from "./Main.svelte";

const main = new Main({
  target: document.getElementById("main")!,
});

export default main;
