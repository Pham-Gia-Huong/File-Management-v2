import File from "../components/file";
import BreadCrumbs from "../components/breadcrumbs";
import Button from "../components/button/button";
import Folder from "../components/folder";
import GridItem from "../components/gridItem";
import Popup from "../components/popup";
import { util } from "../util";

class Container {
  fetchData = async () => {
    let responseRecord = await util.event.index.getRecordByFolder();
    this.listRecord = [...responseRecord.records];
    this.totalRecord = responseRecord.totalCount;
    this.containerGrid = document.createElement("div");
    this.listFile = [];
    this.listFolder = [];
    this.setValueFileAndFolderList();
    this.breadCrumb = new BreadCrumbs({
      onClick: this.selectedBreadCrumb,
      arrFolder: [{ id: 0, name: "abc" }, { id: 1, name: "def" }, { id: 2, name: "erg" }, { id: 3, name: "ccc" }]
    });
    this.folderGrid = this.createFolderGrid();
    this.fileGrid = this.createFileGrid();
  };
  setValueFileAndFolderList() {
    this.listRecord.map(record => {
      if (record.type.value === "Folder") {
        this.listFolder.push(record);
      } else {
        this.listFile.push(record);
      }
    });
  }
  selectedBreadCrumb = (folderId, arrFolder) => {};

  createFolder(a) {}

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
    let folderGrid = new GridItem({
      listItem: this.listFolder,
      type: "Folder",
      title: "Folder",
      className: "folder"
    });

    return folderGrid;
  }
  createFileGrid() {
    let fileGrid = new GridItem({
      listItem: this.listFile,
      type: "File",
      title: "File",
      className: "file",
      dropFile: util.file.addFile
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
