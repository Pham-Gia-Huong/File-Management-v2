import Ultil from "../../util/index";
import { required } from "../../constant/index";
import Icon from "../Icon";
import Label from "../label";
import "./index.css";

class Folder {
  constructor(props) {
    this.propsOnclick = props.onClick;
    this.propsName = props.name;
    this.propsOpenFolder = props.openFolder;
    this.propsId = props.id;
    this.icon = new Icon({
      icon: "fas fa-folder"
    });

    this.folderName = new Label({ name: props.name, fontSize: "20px" });
  }
  handleSelectFolder(fileLayout) {
    let parentFileLayout = fileLayout.parentNode.children;
    for (let i = 0; i < parentFileLayout.length; i++) {
      let currentLabelFileItem = parentFileLayout[i];
      if (parentFileLayout[i] === fileLayout) {
        currentLabelFileItem.classList.add("selected");
      } else {
        currentLabelFileItem.classList.remove("selected");
      }
    }
  }

  handleUnSelected(folderLayout) {
    let parentFolder = folderLayout.parentNode.children;
    for (let i = 0; i < parentFolder.length; i++) {
      parentFolder[i].classList.remove("selected");
    }
  }
  handleOpenFolder() {
    this.propsOpenFolder(this.propsId, this.propsName);
  }
  handleDragOver(event) {
    event.preventDefault();
  }
  handleDrop(event) {
    event.preventDefault();
    let files = event.dataTransfer.files[0];
    console.log(files);
  }
  render() {
    let folder = document.createElement("div");
    folder.className = "folder";
    folder.setAttribute("tabIndex", "-1");
    folder.ondragover = event => this.handleDragOver(event);
    folder.ondrop = event => this.handleDrop(event);

    let icon = this.icon.render();
    folder.appendChild(icon);

    let folderName = this.folderName.render();
    folder.appendChild(folderName);

    folder.onclick = () => this.handleSelectFolder(folder);
    folder.onblur = () => this.handleUnSelected(folder);
    folder.ondblclick = () => this.handleOpenFolder();
    return folder;
  }
}
export default Folder;
