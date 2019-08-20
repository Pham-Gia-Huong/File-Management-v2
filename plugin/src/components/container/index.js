import DropDown from "../dropdown/index";
import Button from "../button/button";
class Container {
  constructor(props) {
    this.listFormField = props.listFormField;
    this.containerPlugin = document.createElement("div");
    this.containerPlugin.className = "plugin-container";
    this.listNewFormField = [];
    this.listNewFormTable = [];
  }
  renderItemFormField = (type, name, description) => {
    let listField = this.listFormField.listField.filter(field => field.type === type);
    let fieldItem = new DropDown({ listOption: listField, name, description });
    this.containerPlugin.appendChild(fieldItem.render());
    return fieldItem;
  };
  renderFormTableField() {
    console.log(this.listFormField);
    let listFieldCreate = [
      { name: "History", description: "Select a table.", type: "SUBTABLE" },
      { name: "Sub File", description: "Select a Attachment field.", type: "File" },
      { name: "Sub Comment", description: "Select a text area field.", type: "MULTI_LINE_TEXT" },
      { name: "Sub date", description: "Select a date and time field.", type: "DATETIME" },
      { name: "Parent Folder", description: "Select a text field.", type: "SINGLE_LINE_TEXT" }
    ];
    listFieldCreate.map(fieldCreate => {
      let fieldSelect = this.renderItemFormField(fieldCreate.type, fieldCreate.name, fieldCreate.description);
      this.listNewFormTable.push(fieldSelect);
    });
  }

  renderFormField() {
    let listFieldCreate = [
      { name: "Parent Folder", description: "Select a Parent Folder field.", type: "SINGLE_LINE_TEXT" },
      { name: "Type", description: "Select a type field.", type: "DROP_DOWN" },
      { name: "Fake Attachment", description: "Select a spacer field.", type: "SPACER" },
      { name: "File", description: "Select a attachment field.", type: "FILE" },
      { name: "Name", description: "Select a text field.", type: "SINGLE_LINE_TEXT" },
      { name: "Extension", description: "Select a text field.", type: "SINGLE_LINE_TEXT" },
      { name: "Size", description: "Select a text field.", type: "SINGLE_LINE_TEXT" },
      { name: "Comment", description: "Select a text area field.", type: "MULTI_LINE_TEXT" },
      { name: "Date And time", description: "Select a date time field.", type: "DATETIME" },
      { name: "Base64", description: "Select a text area field.", type: "MULTI_LINE_TEXT" }
    ];
    listFieldCreate.map(fieldCreate => {
      let fieldSelect = this.renderItemFormField(fieldCreate.type, fieldCreate.name, fieldCreate.description);
      this.listNewFormField.push(fieldSelect);
    });
  }
  handleSave = () => {
    let config = {};
    this.listNewFormField.map(formField => {
      config[formField.name] = formField.getSelected();
    });
    this.listNewFormTable.map(formField => {
      config[formField.name + "History"] = formField.getSelected();
    });
    console.log("config", config);
  };
  handleCancel = () => {};
  render() {
    this.renderFormField();
    this.renderFormTableField();
    let elmBtnCancel = new Button({ className: "kintoneplugin-button-dialog-cancel", name: "Cancel", onClick: this.handleCancel });
    this.containerPlugin.appendChild(elmBtnCancel.render());

    let elmBtnSave = new Button({ className: "kintoneplugin-button-dialog-ok", name: "Save", onClick: this.handleSave });
    this.containerPlugin.appendChild(elmBtnSave.render());

    return this.containerPlugin;
  }
}
export default Container;
