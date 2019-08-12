class Ultil {
  constructor() {
    this.ui = { spinnerWrapper: null };
  }
  addRecord(record) {
    var body = {
      app: kintone.app.getId(),
      record
    };
    kintone.api(kintone.api.url("/k/v1/record", true), "POST", body);
  }
  showSpinner() {
    this.ui.spinnerWrapper = document.createElement("div");
    this.ui.spinnerWrapper.className = "layout-center";

    let spinner = document.createElement("div");
    spinner.className = "lds-dual-ring";
    document.body.appendChild(this.ui.spinnerWrapper);
    this.ui.spinnerWrapper.appendChild(spinner);
  }
  hideSpinner() {
    document.body.removeChild(this.ui.spinnerWrapper);
  }

  updateRecord(event, record) {
    var body = {
      app: event.appId,
      id: event.recordId,
      record
    };
    return kintone.api(kintone.api.url("/k/v1/record", true), "PUT", body);
  }
  hideFieldRecord(recordFieldName) {
    recordFieldName.forEach(fieldName => {
      kintone.app.record.setFieldShown(fieldName, false);
    });
  }
  loopObjectHistory(valueHistory) {
    for (const key in valueHistory) {
      if (valueHistory.hasOwnProperty(key)) {
        const elment = valueHistory[key];
        elment.disabled = true;
      }
    }
  }
  disableHistory(arrHistory) {
    arrHistory.forEach(history => {
      let valueHistory = history.value;
      this.loopObjectHistory(valueHistory);
    });
  }
  disableField(objFieldRecord, type) {
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
}
export default Ultil;
