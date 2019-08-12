import File from "./src/components/file/";
import Folder from "./src/components/folder/";
import "./index.css";
import Container from "./src/container";
import "./lib/fontAwesome";

(() => {
  kintone.events.on("app.record.edit.submit.success", event => {
    let file = new File();
    file.setValueAndUploadFile(event);
  });
  kintone.events.on("app.record.detail.show", event => {
    let objFieldRecord = event.record;
    let recordType = objFieldRecord.type.value;
    if (recordType === "Folder") {
      ultil.hideFieldRecord(["parentFolder", "file", "extension", "size", "comment", "history", "b64", "date"]);
      return;
    }
  });
  kintone.events.on("app.record.edit.show", event => {
    let file = new File();
    let objFieldRecord = event.record;
    let recordType = objFieldRecord.type.value;
    let arrHistory = event.record.history.value;
    ultil.disableField(objFieldRecord, recordType);
    ultil.disableHistory(arrHistory);
    if (recordType === "File") {
      ultil.hideFieldRecord(["b64", "file"]);
      file.renderInputFile();
      file.getCurrentFileValue(objFieldRecord, arrHistory);
    } else {
      ultil.hideFieldRecord(["parentFolder", "file", "extension", "size", "comment", "history", "b64", "date", "type"]);
    }
    return event;
  });

  kintone.events.on("app.record.index.show", () => {
    let container = new Container();
    // let folder = new Folder();
    // folder.renderBtnNewFolder();
    container.render();
  });
})();
