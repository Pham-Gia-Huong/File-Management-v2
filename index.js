import "./index.css";
import Container from "./src/container";
import {
  hideFieldRecord,
  setValueAndUploadFile,
  disableField,
  disableHistory,
  getCurrentFileValue,
  handleFillFileInfoToField
} from "./src/util";
import InputFile from "./src/components/inputFile";
import Spinner from "./src/components/spinner";

(function() {
  kintone.events.on("app.record.edit.submit.success", async event => {
    await setValueAndUploadFile(event);
    setTimeout(() => location.reload(), 1000);
  });
  kintone.events.on("app.record.detail.show", event => {
    let objFieldRecord = event.record;
    let recordType = objFieldRecord.type.value;
    if (recordType === "Folder") {
      hideFieldRecord(["parentFolder", "file", "extension", "size", "comment", "history", "base64", "date"]);
    } else {
      hideFieldRecord(["base64"]);
    }
  });
  kintone.events.on("app.record.edit.show", function(event) {
    let elmSpace = kintone.app.record.getSpaceElement("hardInputFile");
    let objFieldRecord = event.record;
    let recordType = objFieldRecord.type.value;
    let arrHistory = event.record.history.value;
    disableField(objFieldRecord, recordType);
    disableHistory(arrHistory);
    if (recordType === "File") {
      let inputFile = new InputFile({ onChange: handleFillFileInfoToField });
      hideFieldRecord(["base64", "file", "parentFolder"]);
      elmSpace.appendChild(inputFile.render());
      getCurrentFileValue(objFieldRecord, arrHistory);
    } else {
      hideFieldRecord(["parentFolder", "file", "extension", "size", "comment", "history", "base64", "date", "type"]);
    }
    return event;
  });

  kintone.events.on("app.record.index.show", event => {
    if (event.viewName != "Grid") {
      return;
    }
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
