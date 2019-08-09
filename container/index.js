import File from "../edit/index";
(function() {
  let file = new File();
  kintone.events.on("app.record.edit.submit.success", event => {
    file.setValueAndUploadFile(event);
  });

  kintone.events.on("app.record.edit.show", event => {
    let objFieldRecord = event.record;
    let arrHistory = event.record.history.value;
    file.disableField(objFieldRecord);
    file.disableHistory(arrHistory);
    file.hideFieldRecord("b64", "File");
    file.hideFieldRecord(
      ["parentFolder", "file", "extension", "size", "comment", "history", "b64"],
      "Folder"
    );
    file.renderInputFile();
    file.getCurrentFileValue(objFieldRecord, arrHistory);

    return event;
  });
  kintone.events.on("app.record.index.show", () => {
    file.renderBtnNewFolder();
  });
})();
