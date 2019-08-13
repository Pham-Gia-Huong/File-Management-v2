import Label from "../label";
import Button from "../button/button";

class Popup {
  constructor(props) {
    this.props = props;
    this.elmLayoutCenter = document.createElement("div");
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
  renderPopupBtn(elmPopupContainer, inputValuePopup) {
    let elmCreateAndClose = document.createElement("div");
    elmCreateAndClose.className = "popup-create-close";
    elmPopupContainer.appendChild(elmCreateAndClose);

    let elmBtnCreate = new Button({
      name: "Create",
      style: { color: "black", background: "#dae8fc" },
      onClick: () => this.props.handleCreateFolder(inputValuePopup.value)
    });
    elmCreateAndClose.appendChild(elmBtnCreate.render());

    let elmBtnClose = new Button({
      name: "Close",
      style: { color: "black", background: "#f8cecd" },
      onClick: () => this.hidePopupNewFolder()
    });
    elmCreateAndClose.appendChild(elmBtnClose.render());
  }
  renderPopupInput(elmPopupContainer) {
    let elmNameAndInput = document.createElement("div");
    elmNameAndInput.className = "popup-input-name";
    elmPopupContainer.appendChild(elmNameAndInput);

    let elmName = new Label({ name: "Name", fontSize: "14px" });
    elmNameAndInput.appendChild(elmName.render());

    let elmInput = document.createElement("input");
    elmNameAndInput.appendChild(elmInput);
    return { elmInput };
  }
  render() {
    this.elmLayoutCenter.className = "layout-center";

    let elmPopupContainer = document.createElement("div");
    elmPopupContainer.className = "popup-container";
    this.elmLayoutCenter.appendChild(elmPopupContainer);

    this.renderPopupTitleAndIcon(elmPopupContainer);
    let inputValuePopup = this.renderPopupInput(elmPopupContainer);
    this.renderPopupBtn(elmPopupContainer, inputValuePopup.elmInput);

    return this.elmLayoutCenter;
  }
}
export default Popup;
