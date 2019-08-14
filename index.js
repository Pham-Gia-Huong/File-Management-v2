import "./index.css";
import Container from "./src/container";
import "./lib/fontAwesome";
import { util } from "./src/util";
import InputFile from "./src/components/inputFile";
import Spinner from "./src/components/spinner";

(function() {
  kintone.events.on("app.record.edit.submit.success", event => {
    util.event.edit.setValueAndUploadFile(event);
  });
  kintone.events.on("app.record.detail.show", event => {
    let objFieldRecord = event.record;
    let recordType = objFieldRecord.type.value;
    if (recordType === "Folder") {
      util.js.hideFieldRecord(["parentFolder", "file", "extension", "size", "comment", "history", "b64", "date"]);
      return;
    }
  });
  kintone.events.on("app.record.edit.show", function(event) {
    let elmSpace = kintone.app.record.getSpaceElement("hardInputFile");
    let objFieldRecord = event.record;
    let recordType = objFieldRecord.type.value;
    let arrHistory = event.record.history.value;
    util.js.disableField(objFieldRecord, recordType);
    util.js.disableHistory(arrHistory);
    if (recordType === "File") {
      let inputFile = new InputFile({ onChange: util.event.edit.handleFillFileInfoToField });
      util.js.hideFieldRecord(["b64", "file"]);
      elmSpace.appendChild(inputFile.render());
      util.event.edit.getCurrentFileValue(objFieldRecord, arrHistory);
    } else {
      util.js.hideFieldRecord(["parentFolder", "file", "extension", "size", "comment", "history", "base64", "date", "type"]);
    }
    return event;
  });

  kintone.events.on("app.record.index.show", () => {
    let container = new Container();
    let spinner = new Spinner();
    let containerGrid = document.getElementById("layout-grid");
    spinner.showSpinner();
    container.fetchData().then(() => {
      spinner.hideSpinner();
      containerGrid.appendChild(container.render());
    });
    return event;
  });
})();
