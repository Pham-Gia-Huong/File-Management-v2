import Folder from "../folder";
import Label from "../label";
import "./index.css";
import File from "../file";

class GridItem {
  constructor(props) {
    this.props = props;
    this.gridItemLayout = document.createElement("div");
    this.gridItem = document.createElement("div");
  }

  renderItemGrid() {
    this.props.listItem.map(value => {
      let image = "";
      if (value.icon) {
        image = value.icon;
      } else {
        image = value.thumbNail;
      }
      let item = this.renderFileOrFolder(value.name, image);

      this.gridItem.className = "grid-item";
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
    this.gridItemLayout.className = "grid-item-layout";

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
