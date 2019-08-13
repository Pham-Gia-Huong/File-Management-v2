import "./index.css";
import Container from "./src/container";
import "./lib/fontAwesome";
import { ultil } from "./src/ultil";
import InputFile from "./src/components/inputFile";

(() => {
  kintone.events.on("app.record.edit.submit.success", event => {
    ultil.event.edit.setValueAndUploadFile(event);
  });
  kintone.events.on("app.record.detail.show", event => {
    let objFieldRecord = event.record;
    let recordType = objFieldRecord.type.value;
    if (recordType === "Folder") {
      ultil.js.hideFieldRecord(["parentFolder", "file", "extension", "size", "comment", "history", "b64", "date"]);
      return;
    }
  });
  kintone.events.on("app.record.edit.show", event => {
    let elmSpace = kintone.app.record.getSpaceElement("hardInputFile");
    let objFieldRecord = event.record;
    let recordType = objFieldRecord.type.value;
    let arrHistory = event.record.history.value;
    ultil.js.disableField(objFieldRecord, recordType);
    ultil.js.disableHistory(arrHistory);
    if (recordType === "File") {
      let inputFile = new InputFile({ onChange: ultil.event.edit.handleFillFileInfoToField });

      ultil.js.hideFieldRecord(["b64", "file"]);
      elmSpace.appendChild(inputFile.render());

      ultil.event.edit.getCurrentFileValue(objFieldRecord, arrHistory);
    } else {
      ultil.js.hideFieldRecord([
        "parentFolder",
        "file",
        "extension",
        "size",
        "comment",
        "history",
        "base64",
        "date",
        "type"
      ]);
    }
    return event;
  });

  kintone.events.on("app.record.index.show", () => {
    let container = new Container();

    let containerGrid = document.getElementById("layout-grid");
    containerGrid.appendChild(container.render());
  });
})();
