import Folder from "../folder";
import Label from "../label";
import "./index.css";
import File from "../file";
class GridItem {
  constructor(props) {
    this.propsTitle = props.title;
    this.propHandleOpenFolder = props.handleOpenFolder;
    this.propType = props.type;
    this.propListItem = props.listItem;
    this.propOnDropFile = props.onDropFile;
    this.gridItemLayout = document.createElement("div");
    this.gridItemLayout.className = "grid-item-layout " + props.className;
    this.gridItem = document.createElement("div");
    this.gridItem.className = "grid-item";

    this.bindEventDragAndDrop();
  }
  bindEventDragAndDrop() {
    if (this.gridItemLayout.className.includes("file")) {
      this.gridItemLayout.ondragover = event => this.handleDragOverFile(event);
      this.gridItemLayout.ondrop = event => {
        event.preventDefault();
        var file = event.dataTransfer.files[0];
        if (file) {
          this.propOnDropFile(file);
        }
      };
    }
  }
  resetGridItem() {
    let childGridItem = this.gridItem.children;
    for (let i = childGridItem.length - 1; i >= 0; i--) {
      this.gridItem.removeChild(childGridItem[i]);
    }
  }

  reRenderFolder(folders, type) {
    if (type != "list") {
      let newFolder = this.setFolderValue(folders).render();
      this.gridItem.insertBefore(newFolder, this.gridItem.childNodes[0]);
      return;
    }
    this.resetGridItem();
    folders.map(folder => {
      let item = this.setValueItem(folder);
      let newFolder = this.setValueFileOrFolder(item.id, item.name);
      this.gridItem.appendChild(newFolder);
    });
  }
  setValueItem(item) {
    let id = item.$id.value;
    let name = item.name.value;
    let image = item.base64 ? item.base64.value : "";
    return { id, name, image };
  }
  reRenderFile(files, type) {
    if (type != "list") {
      files = this.setFileValue(files.name.value, files.base64.value).render();
      this.gridItem.insertBefore(files, this.gridItem.childNodes[0]);
      return;
    }
    this.resetGridItem();
    files.map(file => {
      let fileInfo = this.setValueItem(file);
      let newFile = this.setValueFileOrFolder(fileInfo.id, fileInfo.name, fileInfo.image);
      this.gridItem.appendChild(newFile);
    });
  }
  handleDragOverFile(event) {
    event.preventDefault();
  }
  renderItemGrid() {
    this.propListItem.map(items => {
      let infoItem = this.setValueItem(items);
      let item = this.setValueFileOrFolder(infoItem.id, infoItem.name, infoItem.image);
      this.gridItem.appendChild(item);
      this.gridItemLayout.appendChild(this.gridItem);
    });
  }

  setFolderValue(name, id) {
    let propsFolder = {
      name,
      id,
      openFolder: this.propHandleOpenFolder
    };
    return new Folder(propsFolder);
  }
  setFileValue(name, image) {
    let propsFile = {
      name,
      image,
      type: "default",
      width: 200,
      height: 200
    };
    return new File(propsFile);
  }

  setValueFileOrFolder(id, name, image) {
    let item = null;
    if (this.propType === "Folder") {
      item = this.setFolderValue(name, id);
    } else {
      item = this.setFileValue(name, image, id);
    }
    return item.render();
  }

  render() {
    let gridTitle = new Label({
      name: this.propsTitle,
      fontSize: "20px",
      fontWeight: "bold"
    });
    this.gridItemLayout.appendChild(gridTitle.render());

    this.renderItemGrid(this.gridItemLayout);

    return this.gridItemLayout;
  }
}

export default GridItem;
