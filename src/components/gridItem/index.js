import Folder from "../folder";
import Label from "../label";
import "./index.css";
import File from "../file";

class GridItem {
  constructor(props) {
    this.props = props;
    this.item = props.item;
  }
  renderItemGrid(gridItem, gridItemLayout) {
    return this.props.arrItem.map(value => {
      let item = this.renderFileOrFolder(value.name, value.src);
      gridItem.appendChild(item);
      gridItemLayout.appendChild(gridItem);
    });
  }
  selectedFolder(name) {
    console.log(name);
  }
  selectedFile() {}
  renderFileOrFolder(name, src) {
    let item = null;
    if (this.props.type === "Folder") {
      let propsFolder = {
        style: {
          marginRight: "20px",
          fontIcon: "50px",
          fontSize: "20px"
        },
        src,
        name,
        onClick: this.selectedFolder
      };
      item = new Folder(propsFolder);
    } else {
      let propsFile = {
        name,
        src,
        style: {
          fontSize: "50px"
        },
        type: "default",
        width: 200,
        height: 200,
        onClick: this.selectedFile
      };
      item = new File(propsFile);
    }
    return item.render();
  }
  selectedFile(e) {
    console.log("file");
  }
  render() {
    let gridItemLayout = document.createElement("div");
    gridItemLayout.className = "grid-item-layout";

    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";

    let initGridTitle = new Label({
      name: this.props.title,
      fontSize: this.props.style.fontSize,
      fontWeight: this.props.style.fontWeight
    });

    let gridTitle = initGridTitle.render();
    gridItemLayout.appendChild(gridTitle);

    this.renderItemGrid(gridItem, gridItemLayout);

    return gridItemLayout;
  }
}

export default GridItem;
