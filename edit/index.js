class File {
  constructor() {
    this.state = {
      elmLayoutCenter: {},
      elmFileInput: {},
      currentFileValue: null
    };
  }

  renderInputFile() {
    let { elmFileInput } = this.state;
    let elmWrap = document.createElement("div");
    elmWrap.className = "wrap";

    let elmInputLabel = document.createElement("div");
    elmInputLabel.textContent = "File";
    elmWrap.appendChild(elmInputLabel);

    elmFileInput = document.createElement("input");
    elmFileInput.type = "file";
    elmFileInput.className = "wrap_input";
    elmFileInput.accept = ".xls,.xlsx,.png,.jpg,.jpeg,.pdf,.doc";
    elmWrap.appendChild(elmFileInput);

    let elmSpace = kintone.app.record.getSpaceElement("hardInputFile");
    elmSpace.appendChild(elmWrap);

    elmFileInput.addEventListener("change", () =>
      this.handleFillFileInfoToField(elmFileInput.files[0])
    );
  }

  setFileInformation(file, imgBase64) {
    var zeroIndex = 0;
    var firstIndex = 1;
    var fileName = file.name.split(".")[zeroIndex];
    var fileExtension = file.name.split(".")[firstIndex];
    var fileSize = file.size + " KB";
    var thumb64 = imgBase64;
    return {
      fileName,
      fileExtension,
      fileSize,
      thumb64
    };
  }
  fillFileInfoToField(file, imgBase64) {
    var fileInfo = this.setFileInformation(file, imgBase64);
    var getRecordDetail = kintone.app.record.get();
    var record = getRecordDetail.record;
    record.name.value = fileInfo.fileName;
    record.size.value = fileInfo.fileSize;
    record.extension.value = fileInfo.fileExtension;
    record.b64.value = fileInfo.thumb64;
    kintone.app.record.set(getRecordDetail);
  }
  updateRecord(event, record) {
    var body = {
      app: event.appId,
      id: event.recordId,
      record
    };
    return kintone.api(kintone.api.url("/k/v1/record", true), "PUT", body);
  }
  async handleFillFileInfoToField(file) {
    let base64 = await this.convertFileToBase64(file);
    this.fillFileInfoToField(file, base64);
  }
  getFileKey(blob, fileName) {
    let formData = new FormData();
    formData.append("file", blob, fileName);
    formData.append("__REQUEST_TOKEN__", kintone.getRequestToken());
    return this.xmlHtppRequest(kintone.api.url("/k/v1/file"), "POST", null, formData);
  }
  xmlHtppRequest(url, method, header, data) {
    return new kintone.Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.open(method, url, true);
      req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      header ? (req.responseType = header) : "";
      req.onload = res => {
        if (res.target.status === 200) {
          var result = res.target.response;
          resolve({ req, result });
        } else {
          reject("some thing error");
        }
      };
      req.send(data);
    });
  }

  convertFileToBase64(file) {
    return new kintone.Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }

  disableField(objFieldRecord) {
    if (objFieldRecord.type.value === "Folder") {
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

  disableHistory(arrHistory) {
    arrHistory.forEach(history => {
      let valueHistory = history.value;
      valueHistory.subComment.disabled = true;
      valueHistory.subDate.disabled = true;
      valueHistory.subFile.disabled = true;
      valueHistory.version.disabled = true;
    });
  }

  hideFieldRecord(recordFieldName, type) {
    if (type === "File") {
      return kintone.app.record.setFieldShown(recordFieldName, false);
    }

    recordFieldName.forEach(fieldName => {
      kintone.app.record.setFieldShown(fieldName, false);
    });
  }
  async setValueFileAttachment(record) {
    let file = this.state.elmFileInput.files[0];
    if (file) {
      record.file = {};
      let blob = new Blob([file], { type: file.type });
      let response = await this.getFileKey(blob, file.name);
      let fileKey = JSON.parse(response.result);
      record.file.value = [fileKey];
    }
    return record;
  }
  async uploadFile(event) {
    let record = {};
    await this.setValueFileAttachment(record);
    this.setValueFileHistory(record, event);
    if (Object.keys(record).length === 0) {
      return;
    }
    await this.updateRecord(event, record);
  }

  convertBase64ToFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async getCurrentFileValue(record, arrHistory) {
    let currentFileKey = record.file.value[0].fileKey;
    let newFileKey = await this.downloadFile(currentFileKey);
    let firstValueInTable = arrHistory[0].value.version.value;
    let numberVersion = arrHistory.length;

    this.state.currentFileValue = {
      value: {
        subComment: record.comment,
        subDate: record.date,
        subFile: {
          value: [newFileKey]
        },
        version: {
          type: "SINGLE_LINE_TEXT",
          value: firstValueInTable ? numberVersion + 1 : numberVersion
        }
      }
    };
  }

  getArrayBuffer(fileKey) {
    const body = {
      fileKey
    };
    let header = "arraybuffer";
    let response = this.xmlHtppRequest(
      kintone.api.urlForGet("/k/v1/file", body, true),
      "GET",
      header,
      {}
    );
    return response;
  }

  convertArrayBufferToBlob(resultArrBuffer) {
    let arrBuffer = resultArrBuffer.result;
    let req = resultArrBuffer.req;
    let fileName = req
      .getResponseHeader("Content-Disposition")
      .substring(req.getResponseHeader("Content-Disposition").indexOf('"'))
      .replace(/['"]/g, "");
    let fileType = req.getResponseHeader("Content-Type");
    let uint8Array = new Uint8Array(arrBuffer);
    let blob = new Blob([uint8Array], { type: fileType });
    return { blob, fileName };
  }

  async downloadFile(fileKey) {
    let resultArrBuffer = await this.getArrayBuffer(fileKey);
    let blobAndFileName = this.convertArrayBufferToBlob(resultArrBuffer);
    let responseFileKey = await this.getFileKey(blobAndFileName.blob, blobAndFileName.fileName);
    let newFileKey = JSON.parse(responseFileKey.result);
    return newFileKey;
  }

  setValueFileHistory(record, event) {
    let { currentFileValue } = this.state;
    console.log("cur", currentFileValue);

    let version = currentFileValue.value.version.value;
    let newValueHistoryTable = event.record.history;
    let minVersion = 1;
    if (version === minVersion) {
      newValueHistoryTable.value[0].value = { ...currentFileValue.value };
    } else {
      newValueHistoryTable.value.push(currentFileValue);
    }
    record.history = newValueHistoryTable;

    return record;
  }

  renderBtnNewFolder() {
    let elmLayoutFolder = document.createElement("div");

    let btnNewFolder = document.createElement("button");
    btnNewFolder.className = "btn-new-folder";
    btnNewFolder.textContent = "New Folder";
    btnNewFolder.addEventListener("click", () => this.showPopupNewFolder());
    elmLayoutFolder.appendChild(btnNewFolder);

    let menuSpace = kintone.app.getHeaderMenuSpaceElement();
    menuSpace.appendChild(elmLayoutFolder);
  }

  renderPopupTitleAndIcon(elmPopupContainer) {
    let elmTitleAndIcon = document.createElement("div");
    elmTitleAndIcon.className = "popup-title-icon";
    elmPopupContainer.appendChild(elmTitleAndIcon);

    let elmTitle = document.createElement("div");
    elmTitle.textContent = "New Folder";
    elmTitleAndIcon.appendChild(elmTitle);

    let elmCloseIcon = document.createElement("div");
    elmCloseIcon.textContent = "x";
    elmCloseIcon.className = "popup-delete-icon";
    elmCloseIcon.addEventListener("click", () => this.hidePopupNewFolder());
    elmTitleAndIcon.appendChild(elmCloseIcon);
  }
  renderPopupInput(elmPopupContainer) {
    let elmNameAndInput = document.createElement("div");
    elmNameAndInput.className = "popup-input-name";
    elmPopupContainer.appendChild(elmNameAndInput);

    let elmName = document.createElement("div");
    elmName.textContent = "Name";
    elmNameAndInput.appendChild(elmName);

    let elmInput = document.createElement("input");
    elmNameAndInput.appendChild(elmInput);
    return elmInput;
  }
  renderPopupBtn(elmPopupContainer, inputValuePopup) {
    let elmCreateAndClose = document.createElement("div");
    elmCreateAndClose.className = "popup-create-close";
    elmPopupContainer.appendChild(elmCreateAndClose);

    let elmBtnCreate = document.createElement("div");
    elmBtnCreate.className = "popup-btn create";
    elmBtnCreate.textContent = "Create";
    elmBtnCreate.addEventListener("click", () => handleNewFolder(inputValuePopup));
    elmCreateAndClose.appendChild(elmBtnCreate);

    let elmBtnClose = document.createElement("div");
    elmBtnClose.className = "popup-btn close";
    elmBtnClose.textContent = "Close";
    elmBtnClose.addEventListener("click", () => this.hidePopupNewFolder());
    elmCreateAndClose.appendChild(elmBtnClose);
  }
  showPopupNewFolder() {
    let { elmLayoutCenter } = this.state;
    elmLayoutCenter = document.createElement("div");
    elmLayoutCenter.className = "layout-center";

    let elmPopupContainer = document.createElement("div");
    elmPopupContainer.className = "popup-container";
    elmLayoutCenter.appendChild(elmPopupContainer);

    this.renderPopupTitleAndIcon(elmPopupContainer);
    let inputValuePopup = this.renderPopupInput(elmPopupContainer);
    this.renderPopupBtn(elmPopupContainer, inputValuePopup);

    let menuSpace = kintone.app.getHeaderMenuSpaceElement();
    menuSpace = kintone.app.getHeaderMenuSpaceElement();
    menuSpace.appendChild(elmLayoutCenter);
  }
  addRecord(record) {
    var body = {
      app: kintone.app.getId(),
      record
    };
    kintone.api(kintone.api.url("/k/v1/record", true), "POST", body);
  }
  handleNewFolder(inputValuePopup) {
    let folderValue = {
      name: {
        value: inputValuePopup.value
      },
      type: {
        value: "Folder"
      }
    };
    addRecord(folderValue);
  }
  hidePopupNewFolder() {
    let menuSpace = kintone.app.getHeaderMenuSpaceElement();
    menuSpace.removeChild(this.state.elmLayoutCenter);
  }
  setValueAndUploadFile(event) {
    let fileType = event.record.type.value;
    if (fileType === "File") {
      this.uploadFile(event);
    }
  }
}
export default File;
