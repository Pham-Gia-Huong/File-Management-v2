import Label from "../label";
import "./index.css";
import Icon from "../Icon";
class File {
  constructor(props) {
    this.propsName = props.name;
    this.propsType = props.type;
    this.propsImage = props.image;
    this.propHeight = props.height;
    this.propsWidth = props.width;
    this.propId = props.id;
    this.fileLayout;
    this.propOnSelect = props.onSelect;
    this.fileName = new Label({ name: props.name, className: "file-label" });
  }
  handleSelectedFile() {
    let parentFileLayout = this.fileLayout.parentNode.children;
    for (let i = 0; i < parentFileLayout.length; i++) {
      let currentLabelFileItem = parentFileLayout[i].children[0].children[1];
      if (parentFileLayout[i] === this.fileLayout) {
        currentLabelFileItem.classList.add("selected");
      } else {
        currentLabelFileItem.classList.remove("selected");
      }
    }
    this.propOnSelect(this.propId);
  }

  handleUnSelect() {
    let parentFileLayout = this.fileLayout.parentNode.children;
    for (let i = 0; i < parentFileLayout.length; i++) {
      let currentLabelFileItem = parentFileLayout[i].children[0].children[1];
      currentLabelFileItem.classList.remove("selected");
    }
  }
  render() {
    this.fileLayout = document.createElement("div");
    this.fileLayout.className = "file-layout";
    this.fileLayout.setAttribute("tabIndex", "-1");
    this.fileLayout.onblur = () => this.handleUnSelect();

    let fileItem = document.createElement("div");
    fileItem.draggable = true;
    fileItem.className = "file-item";
    let fileImage = "";
    let elmFileImage = "";

    if (this.propsType !== "default") {
      fileImage = new Icon({
        icon: this.propsImage,
        fontSize: "50px"
      });

      elmFileImage = fileImage.render();
    } else {
      fileImage = document.createElement("img");
      fileImage.src = this.propsImage;
      fileImage.width = this.propsWidth;
      fileImage.height = this.propHeight;
      elmFileImage = fileImage;
    }

    fileItem.appendChild(elmFileImage);
    let elmFileName = this.fileName.render();
    fileItem.appendChild(elmFileName);

    fileItem.onclick = () => this.handleSelectedFile();
    this.fileLayout.appendChild(fileItem);
    return this.fileLayout;
  }
}
export default File;
