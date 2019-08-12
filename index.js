import File from "./src/file";
import Folder from "./src/folder";

import "./index.css";
import Ultil from "./src/ultil";

import BreadCrumbs from "./src/components/breadcrumbs/";
import Container from "./src/container";

(() => {
  let file = new File();
  let ultil = new Ultil();
  let folder = new Folder();
  let container = new Container();
  kintone.events.on("app.record.edit.submit.success", event => {
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
    folder.renderBtnNewFolder();
    container.renderBreadCrumb();
  });
})();
