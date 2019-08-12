function addRecord(record) {
  var body = {
    app: kintone.app.getId(),
    record
  };
  kintone.api(kintone.api.url("/k/v1/record", true), "POST", body);
}

function updateRecord(event, record) {
  var body = {
    app: event.appId,
    id: event.recordId,
    record
  };
  return kintone.api(kintone.api.url("/k/v1/record", true), "PUT", body);
}
function hideFieldRecord(recordFieldName) {
  recordFieldName.forEach(fieldName => {
    kintone.app.record.setFieldShown(fieldName, false);
  });
}
function loopObjectHistory(valueHistory) {
  for (const key in valueHistory) {
    if (valueHistory.hasOwnProperty(key)) {
      const elment = valueHistory[key];
      elment.disabled = true;
    }
  }
}
function disableHistory(arrHistory) {
  arrHistory.forEach(history => {
    let valueHistory = history.value;
    this.loopObjectHistory(valueHistory);
  });
}
function disableField(objFieldRecord, type) {
  if (type === "Folder") {
    return;
  }
  for (const key in objFieldRecord) {
    if (!objFieldRecord.hasOwnProperty(key)) {
      return;
    }
    if (key != "comment" && key != "date") {
      const record = objFieldRecord[key];
      record.disabled = true;
    }
  }
}
