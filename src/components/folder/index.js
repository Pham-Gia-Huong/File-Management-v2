import { required } from "../../constant/index";
import Icon from "../Icon";
import Label from "../label";
import "./index.css";

class Folder {
  constructor(props) {
    this.icon = new Icon({
      icon: "folder-icon"
    });
    this.folderName = new Label({ name: props.name, fontSize: "20px" });

    this.name = props.name;
    this.id = props.id;
    this.listFolder = props.listFolder;

    this.onclick = props.onClick;
    this.openFolder = props.openFolder;
    this.onDrop = props.onDrop;
    this.onSelect = props.onSelect;
  }
  singleClick() {
    let parentFileLayout = this.folderLayout.parentNode.children;
    for (let i = 0; i < parentFileLayout.length; i++) {
      let currentLabelFileItem = parentFileLayout[i];
      if (parentFileLayout[i] === this.folderLayout) {
        currentLabelFileItem.classList.add("selected");
      } else {
        currentLabelFileItem.classList.remove("selected");
      }
    }
  }
  handleSelectFolder(event) {
    let parentFileLayout = this.folderLayout.parentNode.children;
    if (event.metaKey || event.ctrlKey) {
      for (let i = 0; i < parentFileLayout.length; i++) {
        let currentLabelFileItem = parentFileLayout[i];
        if (parentFileLayout[i] === this.folderLayout) {
          currentLabelFileItem.classList.add("selected");
        }
      }
      this.onSelect(this.id, this.folderLayout, "multi");
    } else {
      this.singleClick();
      this.onSelect(this.id, this.folderLayout);
    }
  }

  handleUnSelect = () => {
    if (this.folderLayout && this.folderLayout.parentNode) {
      let parentFolder = this.folderLayout.parentNode.children;
      for (let i = 0; i < parentFolder.length; i++) {
        parentFolder[i].classList.remove("selected");
      }
    }
  };
  handleOpenFolder() {
    this.openFolder(this.id, this.name);
  }
  handleDragOver(event) {
    event.preventDefault();
  }
  handleDrop = event => {
    event.preventDefault();

    this.onDrop(this.id);
  };
  render() {
    this.folderLayout = document.createElement("div");
    this.folderLayout.className = "folder-layout";
    this.folderLayout.draggable = "true";
    this.folderLayout.ondragover = event => this.handleDragOver(event);
    this.folderLayout.ondrop = event => this.handleDrop(event);

    let icon = this.icon.render();
    this.folderLayout.appendChild(icon);

    let folderName = this.folderName.render();
    this.folderLayout.appendChild(folderName);

    this.folderLayout.onclick = event => this.handleSelectFolder(event);
    this.folderLayout.ondblclick = () => this.handleOpenFolder();
    return this.folderLayout;
  }
}
export default Folder;
