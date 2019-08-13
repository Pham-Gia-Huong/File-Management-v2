import Ultil from "../ultil";
import { required } from "../constant/index";
class Folder {
  constructor() {
    this.ui = {
      elmLayoutCenter: {}
    };
    this.ultil = new Ultil();
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
  renderPopupBtn(elmPopupContainer, inputValuePopup, elmNameAndInput) {
    let elmCreateAndClose = document.createElement("div");
    elmCreateAndClose.className = "popup-create-close";
    elmPopupContainer.appendChild(elmCreateAndClose);

    let elmBtnCreate = document.createElement("div");
    elmBtnCreate.className = "popup-btn create";
    elmBtnCreate.textContent = "Create";
    elmBtnCreate.addEventListener("click", () => this.handleNewFolder(inputValuePopup, elmNameAndInput));
    elmCreateAndClose.appendChild(elmBtnCreate);

    let elmBtnClose = document.createElement("div");
    elmBtnClose.className = "popup-btn close";
    elmBtnClose.textContent = "Close";
    elmBtnClose.addEventListener("click", () => this.hidePopupNewFolder(inputValuePopup, elmNameAndInput));
    elmCreateAndClose.appendChild(elmBtnClose);
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
    return { elmInput, elmNameAndInput };
  }
  showPopupNewFolder() {
    this.ui.elmLayoutCenter = document.createElement("div");
    this.ui.elmLayoutCenter.className = "layout-center";

    let elmPopupContainer = document.createElement("div");
    elmPopupContainer.className = "popup-container";
    this.ui.elmLayoutCenter.appendChild(elmPopupContainer);

    this.renderPopupTitleAndIcon(elmPopupContainer);
    let inputValuePopup = this.renderPopupInput(elmPopupContainer);
    this.renderPopupBtn(elmPopupContainer, inputValuePopup.elmInput, inputValuePopup.elmNameAndInput);

    let menuSpace = kintone.app.getHeaderMenuSpaceElement();
    menuSpace = kintone.app.getHeaderMenuSpaceElement();
    menuSpace.appendChild(this.ui.elmLayoutCenter);
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
  renderErrorNewFolder(wrap) {
    let error = document.createElement("div");
    let elmChildLast = wrap.children.length - 1;
    let elmError = wrap.children[elmChildLast];
    if (elmError.textContent !== required) {
      error.textContent = required;
      error.className = "error";
      wrap.appendChild(error);
    }
    return error;
  }
  isExistInputValue(valueFolderName) {
    return valueFolderName ? true : false;
  }
  async handleNewFolder(elmInputName, elmNameAndInput) {
    let folderValue = {
      name: {
        value: elmInputName.value
      },
      type: {
        value: "Folder"
      }
    };
    let isInputValue = this.isExistInputValue(elmInputName.value);
    if (!isInputValue) {
      this.renderErrorNewFolder(elmNameAndInput);
      return;
    }
    this.hidePopupNewFolder();
    this.ultil.showSpinner();
    await this.ultil.addRecord(folderValue);
    this.ultil.hideSpinner();
  }
  hidePopupNewFolder() {
    let menuSpace = kintone.app.getHeaderMenuSpaceElement();
    menuSpace.removeChild(this.ui.elmLayoutCenter);
  }
}
export default Folder;
