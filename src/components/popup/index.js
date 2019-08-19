import Label from "../label";
import Button from "../button/button";
import { required } from "../../constant/";

class Popup {
  constructor(props) {
    this.createFolder = props.createFolder;
    this.elmLayoutCenter = document.createElement("div");
    this.elmInput = document.createElement("input");
    this.elmNameAndInput = document.createElement("div");
  }
  hidePopupNewFolder() {
    document.body.removeChild(this.elmLayoutCenter);
  }
  renderPopupTitleAndIcon(elmPopupContainer) {
    let elmTitleAndIcon = document.createElement("div");
    elmTitleAndIcon.className = "popup-title-icon";
    elmPopupContainer.appendChild(elmTitleAndIcon);

    let elmTitle = new Label({ name: "New Folder", fontSize: "14px", fontWeight: "bold" });
    elmTitleAndIcon.appendChild(elmTitle.render());

    let elmCloseIcon = document.createElement("div");
    elmCloseIcon.textContent = "x";
    elmCloseIcon.className = "popup-delete-icon";
    elmCloseIcon.addEventListener("click", () => this.hidePopupNewFolder());
    elmTitleAndIcon.appendChild(elmCloseIcon);
  }
  handleCreateFolder(folderNameValue) {
    let error = this.checkInputError();
    if (!error) this.createFolder(folderNameValue);
  }
  renderPopupBtn(elmPopupContainer) {
    let elmCreateAndClose = document.createElement("div");
    elmCreateAndClose.className = "popup-create-close";
    elmPopupContainer.appendChild(elmCreateAndClose);

    let elmBtnCreate = new Button({
      name: "Create",
      style: { color: "black", background: "#dae8fc" },
      onClick: () => this.handleCreateFolder(this.elmInput.value)
    });
    elmCreateAndClose.appendChild(elmBtnCreate.render());

    let elmBtnClose = new Button({
      name: "Close",
      style: { color: "black", background: "#f8cecd" },
      onClick: () => this.hidePopupNewFolder()
    });
    elmCreateAndClose.appendChild(elmBtnClose.render());
  }
  renderPopupInputAndName(elmPopupContainer) {
    this.elmNameAndInput.className = "popup-input-name";
    elmPopupContainer.appendChild(this.elmNameAndInput);

    let elmName = new Label({ name: "Name", fontSize: "14px" });
    this.elmNameAndInput.appendChild(elmName.render());

    this.elmNameAndInput.appendChild(this.elmInput);
  }
  checkInputError() {
    if (!this.elmInput.value) {
      let error = document.createElement("div");
      let elmChildLast = this.elmNameAndInput.children.length - 1;
      let elmError = this.elmNameAndInput.children[elmChildLast];
      if (elmError.textContent !== required) {
        error.textContent = required;
        error.className = "error";
        this.elmNameAndInput.appendChild(error);
      }

      return true;
    }
    return false;
  }

  render() {
    this.elmLayoutCenter.className = "layout-center";

    let elmPopupContainer = document.createElement("div");
    elmPopupContainer.className = "popup-container";
    this.elmLayoutCenter.appendChild(elmPopupContainer);

    this.renderPopupTitleAndIcon(elmPopupContainer);
    this.renderPopupInputAndName(elmPopupContainer);
    this.renderPopupBtn(elmPopupContainer);

    return this.elmLayoutCenter;
  }
}
export default Popup;
