function submitPlugin() {
  var config = {
    "Number Field Code": "number_field",
    "Font Color": "#8bc534"
  };

  kintone.plugin.app.setConfig(config);
}
async function fetchLayoutField() {
  return await kintone.api(kintone.api.url("/k/v1/preview/app/form/layout", true), "GET", { app: kintone.app.getId() });
}

function fetchFormField() {
  return kintone.api(kintone.api.url("/k/v1/app/form/fields", true), "GET", { app: kintone.app.getId() });
}
function setConfigTable(listTable, fieldApp, fieldForm) {
  if (fieldApp.type === "SUBTABLE" && fieldForm.code === fieldApp.code) {
    listTable.push({ code: fieldForm.code, label: fieldForm.label, type: fieldForm.type });
    let fieldSubTable = fieldForm.fields;
    for (const key in fieldSubTable) {
      if (fieldSubTable.hasOwnProperty(key)) {
        let value = fieldSubTable[key];
        listTable.push({ code: value.code, label: value.label, type: value.type });
      }
    }
  }
}
function setConfigField(listField, fieldApp, fieldForm) {
  if (fieldApp.type !== "ROW") return;
  fieldApp.fields.map(fieldLayout => {
    if (fieldLayout.type === "SPACER") {
      let isExist = listField.findIndex(data => data.code && data.code === fieldLayout.elementId);
      if (isExist >= 0) return;
      listField.push({ label: fieldLayout.elementId, code: fieldLayout.elementId, type: fieldLayout.type });
    }
    if (fieldLayout.code !== fieldForm.code) {
      return;
    } else {
      listField.push({ label: fieldForm.label, code: fieldForm.code, type: fieldForm.type });
    }
  });
}

async function getListFormField() {
  let listFormLayout = await fetchLayoutField();
  let listFormField = await fetchFormField();
  listFormField = listFormField.properties;
  let listField = [];
  let listTable = [];
  for (const key in listFormField) {
    if (!listFormField.hasOwnProperty(key)) {
      continue;
    }
    let fieldForm = listFormField[key];
    listFormLayout.layout.map(fieldApp => {
      setConfigTable(listTable, fieldApp, fieldForm);
      setConfigField(listField, fieldApp, fieldForm);
    });
  }
  return { listField, listTable };
}
export { getListFormField };
