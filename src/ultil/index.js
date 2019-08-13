const ultil = {
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
    }
  },
  breadcrumb: {}
};
let currentFileValue = {};
let elmFileInput;

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
    if (key != "comment" && key != "date") {
      const record = objFieldRecord[key];
      record.disabled = true;
    }
  }
}

function setValueAndUploadFile(event) {
  let fileType = event.record.type.value;
  if (fileType === "File") {
    uploadFile(event);
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
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}
function fillFileInfoToField(file, imgBase64) {
  var fileInfo = setFileInformation(file, imgBase64);
  var getRecordDetail = kintone.app.record.get();
  var record = getRecordDetail.record;
  record.name.value = fileInfo.fileName;
  record.size.value = fileInfo.fileSize;
  record.extension.value = fileInfo.fileExtension;
  record.base64.value = fileInfo.thumb64;
  kintone.app.record.set(getRecordDetail);
}

function setFileInformation(file, imgBase64) {
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
    record.file = {};
    let blob = new Blob([file], { type: file.type });
    let response = await uploadFileKey(blob, file.name);
    let fileKey = JSON.parse(response.result);
    record.file.value = [fileKey];
  }
  return record;
}
async function uploadFile(event) {
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

export { ultil };
