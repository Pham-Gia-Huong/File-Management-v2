import File from "../components/file";
import BreadCrumbs from "../components/breadcrumbs";
import Button from "../components/button/button";
import Folder from "../components/folder";
import GridItem from "../components/gridItem";
import Popup from "../components/popup";

class Container {
  constructor(props) {
    this.props = props;
    this.breadCrumb = new BreadCrumbs({
      arrFolder: [{ id: 0, name: "abc" }, { id: 1, name: "def" }, { id: 2, name: "erg" }, { id: 3, name: "ccc" }],
      onClick: this.selectedBreadCrumb
    });
    this.containerGrid = document.createElement("div");
    this.folderGrid = this.createFolderGrid();
    this.fileGrid = this.createFileGrid();
  }

  selectedBreadCrumb = (folderId, arrFolder) => {};

  createFolder(a) {
    console.log(a);
  }

  handleShowPopup() {
    let popupNewFolder = new Popup({
      createFolder: this.createFolder,
      handleClosePopup: this.handleClosePopup
    });
    document.body.appendChild(popupNewFolder.render());
  }
  renderButton() {
    let btnWrap = document.createElement("div");
    btnWrap.className = "btn-wrap";
    let btnNewFolder = new Button({ name: "New Folder", onClick: () => this.handleShowPopup() });
    btnWrap.appendChild(btnNewFolder.render());

    let btnMoveOut = new Button({ name: "Move Out" });
    btnWrap.appendChild(btnMoveOut.render());

    return btnWrap;
  }
  createFolderGrid() {
    let arrNameFolder = [{ name: "A" }];

    let folderGrid = new GridItem({
      listItem: arrNameFolder,
      type: "Folder",
      title: "Folder"
    });

    return folderGrid;
  }
  createFileGrid() {
    let listItem = [
      {
        icon: "",
        name: "hehe",
        thumbNail: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      },
      {
        icon: "",
        name: "hehe",
        thumbNail: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      }
    ];
    let fileGrid = new GridItem({
      listItem,
      type: "File",
      title: "File"
    });
    return fileGrid;
  }
  render() {
    this.containerGrid.className = "container-grid";
    this.containerGrid.appendChild(this.breadCrumb.render());

    let btnGrid = this.renderButton();
    this.containerGrid.appendChild(btnGrid);

    this.containerGrid.appendChild(this.folderGrid.render());

    this.containerGrid.appendChild(this.fileGrid.render());

    return this.containerGrid;
  }
}
export default Container;
