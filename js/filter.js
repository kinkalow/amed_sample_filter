import { reader } from "./csv.js";

function filter_all() {
  const textbox = document.getElementById("filter_all_txt");
  const filter_key = textbox.value;
  reader.read(filter_key);
}
window.filter_all = filter_all;

reader.read();
