import Label from "../label";
import "./index.css";
import Icon from "../Icon";
class File {
  constructor(props) {
    this.fileName = new Label({ name: props.name, className: "file-label" });
    this.fileLayout;

    this.name = props.name;
    this.type = props.type;
    this.image = props.image;
    this.height = props.height;
    this.width = props.width;
    this.id = props.id;

    this.onSelect = props.onSelect;
    this.handleOpenRecord = props.openRecord;

    this.listFile = props.listFile;
  }
  selectSingleClick() {
    let parentFileLayout = this.fileLayout.parentNode.children;
    for (let i = 0; i < parentFileLayout.length; i++) {
      let currentLabelFileItem = parentFileLayout[i].children[0].children[1];
      if (parentFileLayout[i] === this.fileLayout) {
        currentLabelFileItem.classList.add("selected");
      } else {
        currentLabelFileItem.classList.remove("selected");
      }
    }
  }
  handleSelectedFile(event) {
    let parentFileLayout = this.fileLayout.parentNode.children;
    if (event.metaKey || event.ctrlKey) {
      for (let i = 0; i < parentFileLayout.length; i++) {
        let currentLabelFileItem = parentFileLayout[i].children[0].children[1];
        if (parentFileLayout[i] === this.fileLayout) {
          currentLabelFileItem.classList.add("selected");
        }
      }
      this.onSelect(this.id, this.fileLayout, "multi");
    } else {
      this.selectSingleClick();
      this.onSelect(this.id, this.fileLayout);
    }
  }

  handleUnSelect() {
    if (this.fileLayout && this.fileLayout.parentNode) {
      let parentFileLayout = this.fileLayout.parentNode.children;
      for (let i = 0; i < parentFileLayout.length; i++) {
        let currentLabelFileItem = parentFileLayout[i].children[0].children[1];
        currentLabelFileItem.classList.remove("selected");
      }
    }
  }

  render() {
    this.fileLayout = document.createElement("div");
    this.fileLayout.className = "file-layout";

    let fileItem = document.createElement("div");
    fileItem.draggable = true;
    fileItem.className = "file-item";
    let fileImage = "";
    let elmFileImage = "";
    if (this.type !== "default") {
      fileImage = new Icon({
        icon: "file-icon"
      });
      fileImage.setAttribute("data-type", this.image);
      this.fileName.setStyle({ bottom: 0 });
      elmFileImage = fileImage.render();
    } else {
      fileImage = document.createElement("img");
      fileImage.src = this.image;
      fileImage.width = this.width;
      fileImage.height = this.height;
      elmFileImage = fileImage;
    }
    fileItem.appendChild(elmFileImage);

    let elmFileName = this.fileName.render();
    fileItem.appendChild(elmFileName);

    let tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = this.name;
    fileItem.appendChild(tooltip);

    fileItem.onclick = event => this.handleSelectedFile(event);
    fileItem.ondblclick = () => this.handleOpenRecord(this.id);
    this.fileLayout.appendChild(fileItem);
    return this.fileLayout;
  }
}
export default File;
