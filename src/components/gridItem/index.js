import Folder from "../folder";
import Label from "../label";
import "./index.css";
import File from "../file";
class GridItem {
  constructor(props) {
    this.gridItemLayout = document.createElement("div");
    this.gridItemLayout.className = "grid-item-layout " + props.className;

    this.gridItem = document.createElement("div");
    this.gridItem.className = "grid-item";
    this.gridItem.onscroll = event => this.rollItemGrid(event);

    this.title = props.title;
    this.type = props.type;
    this.listItem = props.listItem;
    this.item = null;
    this.allowBlur = true;
    this.listItemGrid = [];

    this.handleOpenFolder = props.handleOpenFolder;
    this.onScroll = props.onScroll || function() {};
    this.onSelect = props.onSelect;
    this.onDropFolder = props.onDropFolder;
    this.bindEventDragAndDrop();
    this.onDropFile = props.onDropFile;
    this.onUnselect = props.onUnselect;
  }
  rollItemGrid = event => {
    let isRoll = false;
    let height = event.target.scrollHeight;
    let top = event.target.scrollTop;
    console.log(this.gridItem.offsetHeight);

    if (height - top < this.gridItem.offsetHeight + 10) {
      isRoll = true;
    }
    this.onScroll(isRoll);
  };

  bindEventDragAndDrop() {
    if (this.gridItemLayout.className.includes("file")) {
      this.gridItemLayout.ondragover = event => this.handleDragOverFile(event);
      this.gridItemLayout.ondrop = event => {
        event.preventDefault();
        var file = event.dataTransfer.files[0];
        if (file) {
          this.onDropFile(file);
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

  setValueItem(item) {
    let id = item.$id.value;
    let name = item.name.value;
    let image = item.base64 ? item.base64.value : "";
    return { id, name, image };
  }
  renderListGrid(files, reset) {
    reset ? this.resetGridItem() : null;
    this.removeContentNotFound();
    if (files && files.length > 0) {
      files.map(file => {
        let fileInfo = this.setValueItem(file);
        let newFile = this.setValueFileOrFolder(fileInfo.id, fileInfo.name, fileInfo.image);
        this.gridItem.appendChild(newFile.render());
      });
    }
    this.renderContentNotFound(files);
  }
  removeContentNotFound() {
    if (this.gridItem.textContent.includes("Content is not found")) {
      this.gridItem.removeChild(this.gridItem.firstChild);
    }
  }
  renderOneGrid(file) {
    this.removeContentNotFound();
    let fileInfo = this.setValueItem(file);
    file = this.setValueFileOrFolder(fileInfo.id, fileInfo.name, fileInfo.image);
    if (this.gridItemLayout.children && this.gridItemLayout.children[1]) {
      this.gridItem.insertBefore(file.render(), this.gridItem.childNodes[0]);
    } else {
      this.gridItem.appendChild(file.render());
    }
  }

  renderGridAfterDrop(folders) {
    this.removeContentNotFound();
    if (folders && folders.length > 0) {
      folders.map(folder => {
        let parentElmFileLayout = folder.elm && folder.elm.parentNode;
        parentElmFileLayout.removeChild(folder.elm);
      });
    }
  }
  renderContentNotFound(listItem) {
    let isExistGridItem = this.gridItem && this.gridItem.children.length > 0;

    if (listItem && listItem.length === 0 && !isExistGridItem) {
      this.gridItem.textContent = "Content is not found";
      return true;
    } else if (!listItem && !isExistGridItem) {
      this.gridItem.textContent = "Content is not found";
      return true;
    }
    return false;
  }
  reRender(items, type, reset = true) {
    if (type === "single") {
      this.renderOneGrid(items);
    } else if (type === "multiple") {
      this.renderListGrid(items, reset);
    } else if (type === "singleDrop") {
      this.renderGridAfterDrop(items);
    }
  }

  handleDragOverFile(event) {
    event.preventDefault();
  }
  renderItemGrid() {
    let isContent = this.renderContentNotFound(this.listItem);
    if (isContent) {
      return;
    }
    this.listItem.map(items => {
      let infoItem = this.setValueItem(items);
      this.item = this.setValueFileOrFolder(infoItem.id, infoItem.name, infoItem.image);
      this.gridItem.appendChild(this.item.render());
    });
  }
  resetListItemGrid() {
    this.listItemGrid = [];
  }
  getListItemGrid() {
    return this.listItemGrid;
  }
  selectItem = (fileId, layout, type) => {
    this.allowBlur = true;
    if (!fileId) return;
    if (type === "multi") {
      let index = this.listItemGrid.findIndex(grid => grid.id === fileId);
      if (index < 0) {
        this.listItemGrid.push({ id: fileId, elm: layout });
      }
    } else {
      this.listItemGrid = [{ id: fileId, elm: layout }];
    }
    this.onSelect();
  };

  setFolderValue(name, id) {
    let propsFolder = {
      name,
      id,
      openFolder: this.handleOpenFolder,
      onDrop: this.onDropFolder,
      onSelect: this.selectItem
    };
    return new Folder(propsFolder);
  }
  handleOpenRecord(recordId) {
    let url = kintone.api.url(`/k/${kintone.app.getId()}/show#record=${recordId}`);
    url = url.replace(".json", "");
    window.open(url, "_blank");
  }
  setFileValue(name, image, id) {
    let type = "default";
    if (image.includes("doc") || image.includes("xls") || image.includes("pdf")) {
      type = "icon";
    }
    let propsFile = {
      id,
      name,
      image,
      type,
      width: 200,
      height: 200,
      onSelect: this.selectItem,
      openRecord: this.handleOpenRecord
    };
    return new File(propsFile);
  }

  setValueFileOrFolder(id, name, image) {
    if (this.type === "Folder") {
      this.item = this.setFolderValue(name, id);
    } else {
      this.item = this.setFileValue(name, image, id);
    }
    return this.item;
  }

  removeTabIndex() {
    this.gridItemLayout.removeAttribute("tabIndex");
  }
  addTabIndex() {
    this.gridItemLayout.setAttribute("tabIndex", "=1");
  }
  setAllowBlur(isBlur) {
    this.allowBlur = isBlur;
  }

  bindEventBlur() {
    this.gridItemLayout.onblur = () => {
      if (this.allowBlur) {
        this.item.handleUnSelect();
        this.onUnselect();
        this.listItemGrid = [];
      }
    };
  }

  render() {
    let gridTitle = new Label({
      name: this.title,
      fontSize: "20px",
      fontWeight: "bold"
    });
    this.gridItemLayout.appendChild(gridTitle.render());
    this.gridItemLayout.setAttribute("tabIndex", "-1");

    this.renderItemGrid();
    this.gridItemLayout.appendChild(this.gridItem);

    if (this.type === "File") {
      if (this.item) {
        this.bindEventBlur();
      }
    }
    if (this.type === "Folder") {
      if (this.item) {
        this.bindEventBlur();
      }
    }

    return this.gridItemLayout;
  }
}

export default GridItem;
