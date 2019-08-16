const util = {
  js: {
    disableField,
    disableHistory,
    hideFieldRecord
  },
  common: {
    addRecord,
    updateRecord
  },
  event: {
    edit: {
      setValueAndUploadFile,
      getCurrentFileValue,
      handleFillFileInfoToField
    },
    index: {
      getAllRecord
    }
  },
  folder: {
    createFolder
  },
  breadcrumb: {},
  file: { addFile, uploadFileDrop }
};
let currentFileValue = {};
let elmFileInput;

async function uploadFileDrop(parentFolder, listRecordId, currentParentFolder) {
  let records = setValueFolderRecord(parentFolder, listRecordId);
  await updateMultiRecord(records);
  let responListRecord = await getAllRecord(currentParentFolder);
  let listRecord = responListRecord.records;
  return listRecord;
}
function updateMultiRecord(records) {
  let body = {
    app: kintone.app.getId(),
    records
  };
  return kintone.api(kintone.api.url("/k/v1/records", true), "PUT", body);
}
function setValueFolderRecord(parentFolder, listRecordId) {
  let records = [];
  listRecordId.map(id => {
    records.push({
      id,
      record: {
        parentFolder: {
          value: parentFolder
        }
      }
    });
  });
  return records;
}
async function createFolder(folderName, parentFolder) {
  let folderValue = {
    name: {
      value: folderName
    },
    type: {
      value: "Folder"
    },
    parentFolder: {
      value: parentFolder
    }
  };
  await addRecord(folderValue);
  let responseRecord = await getAllRecord(parentFolder);
  folderName = responseRecord.records[0].name.value;
  return folderName;
}
function setDefaultValueTable() {
  let historyTable = [
    {
      value: {
        subComment: {
          value: ""
        },
        subDate: {
          value: ""
        },
        subFile: {
          value: []
        },
        version: {
          value: ""
        }
      }
    }
  ];
  return historyTable;
}
async function addFile(file, parentFolder) {
  if (file) {
    try {
      let fileInfo = setFileInformation(file);
      let blob = new Blob([file], { type: file.type });
      let response = await uploadFileKey(blob, file.name);
      let fileKey = response.result;
      fileInfo.fileKey = [JSON.parse(fileKey)];
      let base64 = await convertFileToBase64(file);
      fileInfo.thumb64 = base64;
      let bodyNewFile = setNewValueFile(fileInfo, parentFolder);
      await addRecord(bodyNewFile);
      let listRecord = await getAllRecord(parentFolder);
      return listRecord;
    } catch (e) {
      console.error(e);
    }
  }
}
function setNewValueFile(fileInfo, parentFolder) {
  // showSpinner();
  let bodyNewFile = {
    file: {
      value: fileInfo.fileKey
    },
    type: {
      value: "File"
    },
    parentFolder: {
      value: parentFolder
    },
    extension: {
      value: fileInfo.fileExtension
    },
    name: {
      value: fileInfo.fileName
    },
    size: {
      value: fileInfo.fileSize
    },
    base64: {
      value: fileInfo.thumb64
    },
    history: {
      value: setDefaultValueTable()
    }
  };
  return bodyNewFile;
}
async function getAllRecord(parentFolder = "0", limit = 500, offset = 0) {
  let query = "";
  query = `limit ${limit} offset ${offset}`;
  if (parentFolder) {
    query = `parentFolder = "${parentFolder}" limit ${limit} offset ${offset}`;
  }
  let body = {
    app: kintone.app.getId(),
    query,
    fields: ["$id", "parentFolder", "type", "base64", "name"],
    totalCount: true
  };
  let listRecord = await kintone.api(kintone.api.url("/k/v1/records", true), "GET", body);
  return listRecord;
}

function addRecord(record) {
  let body = {
    app: kintone.app.getId(),
    record
  };
  return kintone.api(kintone.api.url("/k/v1/record", true), "POST", body);
}

function updateRecord(event, record) {
  let body = {
    app: kintone.app.getId(),
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
    loopObjectHistory(valueHistory);
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
    if (key != "comment" && key != "date" && key != "parentFolder") {
      const record = objFieldRecord[key];
      record.disabled = true;
    }
  }
}

function setValueAndUploadFile(event) {
  let fileType = event.record.type.value;
  if (fileType === "File") {
    updateFile(event);
  }
}
function uploadFileKey(blob, fileName) {
  let formData = new FormData();
  formData.append("file", blob, fileName);
  formData.append("__REQUEST_TOKEN__", kintone.getRequestToken());
  return xmlHtppRequest(kintone.api.url("/k/v1/file"), "POST", null, formData);
}
function convertFileToBase64(file) {
  return new kintone.Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(error);
  });
}
function fillFileInfoToField(file, imgBase64) {
  let fileInfo = setFileInformation(file);
  let getRecordDetail = kintone.app.record.get();
  let record = getRecordDetail.record;
  record.name.value = fileInfo.fileName;
  record.size.value = fileInfo.fileSize;
  record.extension.value = fileInfo.fileExtension;
  record.base64.value = imgBase64;
  kintone.app.record.set(getRecordDetail);
}

function setFileInformation(file) {
  let zeroIndex = 0;
  let firstIndex = 1;
  let fileName = file.name.split(".")[zeroIndex];
  let fileExtension = file.name.split(".")[firstIndex];
  let fileSize = file.size + " KB";
  return {
    fileName,
    fileExtension,
    fileSize
  };
}
async function handleFillFileInfoToField(file) {
  elmFileInput = file;
  let base64 = await convertFileToBase64(file);
  fillFileInfoToField(file, base64);
}
function setValueFileHistory(record, event) {
  let version = currentFileValue.value.version.value;
  let newHistoryTableValue = event.record.history;
  let minVersion = 1;
  if (version === minVersion) {
    newHistoryTableValue.value[0].value = { ...currentFileValue.value };
  } else {
    newHistoryTableValue.value.push(currentFileValue);
  }
  record.history = newHistoryTableValue;

  return record;
}
async function setValueFileAttachment(record) {
  let file = elmFileInput;
  if (file) {
    let blob = new Blob([file], { type: file.type });
    let response = await uploadFileKey(blob, file.name);
    let fileKey = JSON.parse(response.result);
    record.file = { value: [fileKey] };
  }
  return record;
}
async function updateFile(event) {
  let record = {};
  await setValueFileAttachment(record);
  setValueFileHistory(record, event);
  if (Object.keys(record).length === 0) {
    return;
  }
  await updateRecord(event, record);
}
function xmlHtppRequest(url, method, header, data) {
  return new kintone.Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    header ? (req.responseType = header) : "";
    req.onload = res => {
      if (res.target.status === 200) {
        let result = res.target.response;
        resolve({ req, result });
      } else {
        reject("some thing error");
      }
    };
    req.send(data);
  });
}
async function getCurrentFileValue(record, arrHistory) {
  let currentFileKey = record.file.value[0].fileKey;
  let newFileKey = await downloadFile(currentFileKey);
  let firstValueInTable = arrHistory[0].value.version.value;
  let numberVersion = arrHistory.length;

  currentFileValue = {
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
function getArrayBuffer(fileKey) {
  const body = {
    fileKey
  };
  let header = "arraybuffer";
  let response = xmlHtppRequest(kintone.api.urlForGet("/k/v1/file", body, true), "GET", header, {});
  return response;
}
function convertArrayBufferToBlob(resultArrBuffer) {
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
async function downloadFile(fileKey) {
  let resultArrBuffer = await getArrayBuffer(fileKey);
  let blobAndFileName = convertArrayBufferToBlob(resultArrBuffer);
  let responseFileKey = await uploadFileKey(blobAndFileName.blob, blobAndFileName.fileName);
  let newFileKey = JSON.parse(responseFileKey.result);
  return newFileKey;
}

async function getListRecordByFolderId(id) {
  let listRecord = await getAllRecord(id);
  let newListRecord = listRecord.records.filter(record => record.parentFolder.value === id);
  return newListRecord;
}
export { util, getListRecordByFolderId, uploadFileDrop };
