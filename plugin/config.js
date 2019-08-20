import Container from "./src/components/container";
import { getListFormField } from "./src/ultil";
(function(PLUGIN_ID) {
  "use strict";

  let config = kintone.plugin.app.getConfig(PLUGIN_ID);
  window.addEventListener("DOMContentLoaded", async function() {
    let listFormField = await getListFormField();
    let container = new Container({ listFormField });
    let containerPlugin = document.getElementById("plugin");
    containerPlugin.appendChild(container.render());
  });
})(kintone.$PLUGIN_ID);
