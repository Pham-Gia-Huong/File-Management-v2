function fillFileInfoToField(file, imgBase64) {
  var fileInfo = this.setFileInformation(file, imgBase64);
  var getRecordDetail = kintone.app.record.get();
  var record = getRecordDetail.record;
  record.name.value = fileInfo.fileName;
  record.size.value = fileInfo.fileSize;
  record.extension.value = fileInfo.fileExtension;
  record.b64.value = fileInfo.thumb64;
  kintone.app.record.set(getRecordDetail);
}
