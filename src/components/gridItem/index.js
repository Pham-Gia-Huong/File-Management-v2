import Folder from "../folder";
import Label from "../label";
import "./index.css";
import File from "../file";
import Spinner from "../spinner";

class GridItem {
  constructor(props) {
    this.props = props;

    this.gridItemLayout = document.createElement("div");
    this.gridItemLayout.className = "grid-item-layout " + this.props.className;

    this.gridItem = document.createElement("div");
    this.gridItem.className = "grid-item";

    this.bindEventDragAndDrop();
  }
  bindEventDragAndDrop() {
    if (this.gridItemLayout.className.includes("file")) {
      this.gridItemLayout.addEventListener("dragover", this.handleDragOverFile);
      this.gridItemLayout.addEventListener("drop", this.handleDropFile);
    }
  }
  handleDropFile = async e => {
    e.preventDefault();
    var file = event.dataTransfer.files[0];
    if (this.props.dropFile) {
      let spinner = new Spinner();
      spinner.showSpinner();
      let responseGetAllRecord = await this.props.dropFile(file);
      spinner.hideSpinner();
      let newFile = responseGetAllRecord.records[0];
      this.reRenderFile(newFile);
    }
  };

  reRenderFile(newFile) {
    newFile = this.setFileValue(newFile.name.value, newFile.base64.value).render();
    this.gridItem.insertBefore(newFile, this.gridItem.childNodes[0]);
  }
  handleDragOverFile(event) {
    event.preventDefault();
  }
  renderItemGrid() {
    this.props.listItem.map(value => {
      let name = value.name.value;
      let image = value.base64.value;
      let item = this.renderFileOrFolder(name, image);
      this.gridItem.appendChild(item);
      this.gridItemLayout.appendChild(this.gridItem);
    });
  }

  selectedFolder(elmFileLayout) {}
  checkTypeItemGrid() {}
  setFolderValue(name) {
    let propsFolder = {
      name,
      onClick: this.selectedFolder
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
  renderFileOrFolder(name, image) {
    let item = null;
    if (this.props.type === "Folder") {
      item = this.setFolderValue(name);
    } else {
      item = this.setFileValue(name, image);
    }
    return item.render();
  }
  render() {
    let gridTitle = new Label({
      name: this.props.title,
      fontSize: "20px",
      fontWeight: "bold"
    });
    this.gridItemLayout.appendChild(gridTitle.render());

    this.renderItemGrid(this.gridItemLayout);

    return this.gridItemLayout;
  }
}

export default GridItem;
