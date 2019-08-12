import File from "../components/file";
import BreadCrumbs from "../components/breadcrumbs";
import Button from "../components/button/button";
import Folder from "../components/folder";
import GridItem from "../components/gridItem";

class Container {
  constructor(props) {
    this.props = props;
    this.breadCrumb = new BreadCrumbs({
      arrFolder: [{ id: 0, name: "abc" }, { id: 1, name: "def" }, { id: 2, name: "erg" }, { id: 3, name: "ccc" }],
      onClick: this.selectedBreadCrumb
    });
    this.folderGrid = null;
    this.fileGrid = null;
    this.renderFolderGrid();
    this.renderFileGrid();
  }

  selectedBreadCrumb(e) {
    console.log(e);
  }

  renderButton() {
    let btnWrap = document.createElement("div");

    let btnNewFolder = new Button({ name: "New Folder" });
    btnWrap.appendChild(btnNewFolder.render());

    let btnMoveOut = new Button({ name: "Move Out" });
    btnWrap.appendChild(btnMoveOut.render());

    return btnWrap;
  }
  renderFolderGrid() {
    let arrNameFolder = [{ name: "A" }];

    this.folderGrid = new GridItem({
      listItem: arrNameFolder,
      type: "Folder",
      title: "Folder",
      style: { fontSize: "20px", fontWeight: "bold" }
    });

    return this.folderGrid.render();
  }
  renderFileGrid() {
    let arrFile = [
      {
        icon: "",
        name: "hehe",
        thumbNail:
          "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      }
    ];
    this.fileGrid = new GridItem({
      listItem: arrFile,
      type: "File",
      title: "File",
      style: { fontSize: "20px", fontWeight: "bold" }
    });
    return this.fileGrid.render();
  }
  render() {
    let containerGrid = document.createElement("div");

    containerGrid.appendChild(this.breadCrumb.render());

    let btnGrid = this.renderButton();
    containerGrid.appendChild(btnGrid);

    let folderGrid = this.renderFolderGrid();
    containerGrid.appendChild(folderGrid);

    let fileGrid = this.renderFileGrid(containerGrid);
    containerGrid.appendChild(fileGrid);

    return containerGrid;
  }
}
export default Container;
