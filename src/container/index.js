import BreadCrumbs from "../components/breadcrumbs";
import Button from "../components/button/button";
import GridItem from "../components/gridItem";
import Popup from "../components/popup";
import Spinner from "../components/spinner";
import { createFolder, uploadFileDrop, getAllRecord, addFile } from "../util";

class Container {
  fetchInitialData = async () => {
    this.listFile = await getAllRecord("0", 10, 0, "File");
    this.listFolder = await getAllRecord("0", 50, 0, "Folder");

    this.containerGrid = document.createElement("div");
    this.spinner = new Spinner();
    this.breadCrumb = new BreadCrumbs({
      onSelected: this.selectedBreadCrumb,
      listBreadCrumb: [{ id: "0", name: "Root" }]
    });
    this.btnMoveOut = new Button({
      name: "Move Out",
      onClick: () => this.handleMoveOut(),
      onMousedown: () => this.handleRemoveBlurGridItem()
    });

    this.folderGrid = this.createFolderGrid();
    this.fileGrid = this.createFileGrid();

    this.popupNewFolder;
    this.listGrid = [];
    this.IshasMoreRecord = true;
    this.offset = 10;

    this.btnMoveOut.hide();
  };

  async fetchFileAndFolderList(parentFolder) {
    this.listFile = await getAllRecord(parentFolder, 10, 0, "File");
    this.listFolder = await getAllRecord(parentFolder, 50, 0, "Folder");
  }
  checkStatusBtnMoveOut(name) {
    if (name != "Root") {
      this.btnMoveOut.show();
    } else {
      this.btnMoveOut.hide();
    }
    this.btnMoveOut.disable();
  }
  selectedBreadCrumb = async currentFolder => {
    this.checkStatusBtnMoveOut(currentFolder.name);
    this.folderGrid.resetListItemGrid();
    this.fileGrid.resetListItemGrid();
    this.IshasMoreRecord = true;
    await this.renderGridItemByFolderClick(currentFolder.id);
  };

  handleCreateFolder = async folderName => {
    let parentFolder = this.breadCrumb.getCurrentBreadCrumb() ? this.breadCrumb.getCurrentBreadCrumb() : "0";
    this.checkStatusBtnMoveOut(parentFolder.name);
    this.popupNewFolder.hidePopupNewFolder();
    this.spinner.showSpinner();
    let folder = await createFolder(folderName, parentFolder.id);
    this.spinner.hideSpinner();
    this.folderGrid.reRender(folder, "single");
  };

  handleShowPopup() {
    this.popupNewFolder = new Popup({
      createFolder: this.handleCreateFolder
    });
    document.body.appendChild(this.popupNewFolder.render());
  }
  getListItemGrid() {
    let folderItemGrid = this.folderGrid.getListItemGrid();
    let fileItemGrid = this.fileGrid.getListItemGrid();
    if (folderItemGrid && folderItemGrid.length > 0) {
      return folderItemGrid;
    } else if (fileItemGrid && fileItemGrid.length > 0) {
      return fileItemGrid;
    }
  }
  buildRenderItemGrid(listItemGrid) {
    let typeGrid = listItemGrid[0].elm.className;
    if (typeGrid.includes("folder-layout")) {
      this.folderGrid.reRender(listItemGrid, "singleDrop");
      this.folderGrid.resetListItemGrid();
      this.folderGrid.renderContentNotFound();
    } else {
      this.fileGrid.reRender(listItemGrid, "singleDrop");
      this.fileGrid.resetListItemGrid();
      this.fileGrid.renderContentNotFound();
    }
  }
  dropFileToFolder = async parentFolder => {
    let listItemGrid = this.getListItemGrid();
    if (!listItemGrid) {
      return;
    }
    this.spinner.showSpinner();
    let currentParentFolder = this.breadCrumb.getCurrentBreadCrumb() ? this.breadCrumb.getCurrentBreadCrumb().id : "0";
    let isUploadLoadFile = await uploadFileDrop(parentFolder, listItemGrid, currentParentFolder);
    if (isUploadLoadFile) {
      this.buildRenderItemGrid(listItemGrid);
      this.spinner.hideSpinner();
    }
  };

  dropFileToFolder = async parentFolder => {
    let isUploadLoadFolder = this.buildUploadRecordDrop(parentFolder);
    if (isUploadLoadFolder) {
      this.folderGrid.reRender(this.listGrid, "singleDrop");
      this.Spinner.hideSpinner();
      this.listGrid = [];
    }
  };

  handleRemoveBlurGridItem = () => {
    this.fileGrid.setAllowBlur(false);
    this.folderGrid.setAllowBlur(false);
  };
  async handleMoveOut() {
    this.spinner.showSpinner();
    let listItemGrid = this.getListItemGrid();
    if (!listItemGrid) return;
    let previousBreadCrum = this.breadCrumb.getPreviousBreadCrum() && this.breadCrumb.getPreviousBreadCrum().id;
    let isUpdateFile = await uploadFileDrop(previousBreadCrum, listItemGrid);
    if (isUpdateFile) {
      this.buildRenderItemGrid(listItemGrid);
      this.spinner.hideSpinner();
      this.btnMoveOut.disable();
    }
  }
  createButton() {
    let btnWrap = document.createElement("div");
    btnWrap.className = "btn-wrap";

    let btnNewFolder = new Button({ name: "New Folder", onClick: () => this.handleShowPopup() });
    btnWrap.appendChild(btnNewFolder.render());

    btnWrap.appendChild(this.btnMoveOut.render());
    this.btnMoveOut.disable();
    return btnWrap;
  }

  async renderGridItemByFolderClick(id) {
    this.spinner.showSpinner();
    await this.fetchFileAndFolderList(id);
    this.folderGrid.reRender(this.listFolder, "multiple");
    this.fileGrid.reRender(this.listFile, "multiple");
    this.spinner.hideSpinner();
  }

  handleOpenFolder = async (id, name) => {
    this.breadCrumb.addBreadCrumb(id, name);
    this.checkStatusBtnMoveOut(name);
    this.IshasMoreRecord = true;
    await this.renderGridItemByFolderClick(id);
  };
  createFolderGrid = () => {
    let folderGrid = new GridItem({
      listItem: this.listFolder,
      type: "Folder",
      title: "Folder",
      className: "folder",
      handleOpenFolder: this.handleOpenFolder,
      onDropFolder: this.dropFileToFolder,
      onSelect: this.btnMoveOut.enble,
      onUnselect: this.btnMoveOut.disable
    });
    return folderGrid;
  };

  handleDropFile = async file => {
    let parentFolder = this.breadCrumb.getCurrentBreadCrumb() ? this.breadCrumb.getCurrentBreadCrumb().id : "0";
    this.spinner.showSpinner();
    this.listFile = await addFile(file, parentFolder);
    if (this.listFile) {
      this.spinner.hideSpinner();
      let newFile = this.listFile[0];
      this.fileGrid.reRender(newFile, "single");
    }
  };
  handleLoadMore = async isRoll => {
    if (isRoll && this.IshasMoreRecord) {
      this.IshasMoreRecord = false;
      let parentFolder = this.breadCrumb.getCurrentBreadCrumb() ? this.breadCrumb.getCurrentBreadCrumb().id : "0";
      this.spinner.showSpinner();
      let listFile = await getAllRecord(parentFolder, 10, this.offset, "File");
      if (listFile.length === 0) {
        this.offset = 10;
        this.spinner.hideSpinner();
      } else {
        this.IshasMoreRecord = true;
        this.offset = this.offset + 10;
        this.fileGrid.reRender(listFile, "multiple", false);
        this.spinner.hideSpinner();
      }
    }
  };
  createFileGrid() {
    let fileGrid = new GridItem({
      listItem: this.listFile,
      type: "File",
      title: "File",
      className: "file",
      onDropFile: this.handleDropFile,
      onSelect: this.btnMoveOut.enble,
      onUnselect: this.btnMoveOut.disable,
      onScroll: this.handleLoadMore
    });
    return fileGrid;
  }
  render() {
    this.containerGrid.className = "container-grid";
    this.containerGrid.appendChild(this.breadCrumb.render());

    this.containerGrid.appendChild(this.createButton());

    this.containerGrid.appendChild(this.folderGrid.render());

    this.containerGrid.appendChild(this.fileGrid.render());

    return this.containerGrid;
  }
}
export default Container;
