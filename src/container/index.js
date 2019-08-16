import File from "../components/file";
import BreadCrumbs from "../components/breadcrumbs";
import Button from "../components/button/button";
import Folder from "../components/folder";
import GridItem from "../components/gridItem";
import Popup from "../components/popup";
import { util, getListRecordByFolderId, uploadFileDrop } from "../util";
import Spinner from "../components/spinner";

class Container {
  fetchData = async () => {
    let responseRecord = await util.event.index.getAllRecord();
    this.listRecord = responseRecord.records;
    this.totalRecord = responseRecord.totalCount;
    this.containerGrid = document.createElement("div");
    this.listFile = this.listRecord.filter(record => record.type.value === "File");
    this.listFolder = this.listRecord.filter(record => record.type.value === "Folder");
    this.listBreadCrumb = [];
    this.listFileId = [];
    this.breadCrumb = new BreadCrumbs({
      onSelected: this.selectedBreadCrumb,
      listBreadCrumb: []
    });
    this.spinner = new Spinner();
    this.folderGrid = this.createFolderGrid();
    this.fileGrid = this.createFileGrid();
    this.popupNewFolder;
  };
  setValueFileOrFolderList(listRecord) {
    this.listFile = listRecord.filter(record => record.type.value === "File");
    this.listFolder = listRecord.filter(record => record.type.value === "Folder");
  }
  selectedBreadCrumb = async currentFolder => {
    await this.renderGridItemByFolderClick(currentFolder.id);
  };
  handleCreateFolder = async folderName => {
    let parentFolder = this.breadCrumb.getCurrentBreadCrumb() ? this.breadCrumb.getCurrentBreadCrumb().id : "0";
    this.popupNewFolder.hidePopupNewFolder();
    this.spinner.showSpinner();
    folderName = await util.folder.createFolder(folderName, parentFolder);
    this.spinner.hideSpinner();
    this.folderGrid.reRenderFolder(folderName);
  };
  handleShowPopup() {
    this.popupNewFolder = new Popup({
      createFolder: this.handleCreateFolder
    });
    document.body.appendChild(this.popupNewFolder.render());
  }
  dropFileToFolder = async folderId => {
    this.spinner.showSpinner();
    let currentParentFolder = this.breadCrumb.getCurrentBreadCrumb() ? this.breadCrumb.getCurrentBreadCrumb().id : "0";
    let listRecord = await uploadFileDrop(folderId, this.listFileId, currentParentFolder);
    this.setValueFileOrFolderList(listRecord);
    this.folderGrid.reRenderFolder(this.listFolder, "list");
    this.fileGrid.reRenderFile(this.listFile, "list");
    this.spinner.hideSpinner();
  };
  selectFile = fileId => {
    this.listFileId = [fileId];
  };
  createButton() {
    let btnWrap = document.createElement("div");
    btnWrap.className = "btn-wrap";

    let btnNewFolder = new Button({ name: "New Folder", onClick: () => this.handleShowPopup() });
    btnWrap.appendChild(btnNewFolder.render());

    let btnMoveOut = new Button({ name: "Move Out" });
    btnWrap.appendChild(btnMoveOut.render());

    return btnWrap;
  }

  async renderGridItemByFolderClick(id) {
    this.spinner.showSpinner();
    let listRecord = await getListRecordByFolderId(id);
    this.setValueFileOrFolderList(listRecord);
    this.folderGrid.reRenderFolder(this.listFolder, "list");
    this.fileGrid.reRenderFile(this.listFile, "list");
    this.spinner.hideSpinner();
  }

  handleOpenFolder = async (id, name) => {
    this.breadCrumb.addBreadCrumb(id, name);
    await this.renderGridItemByFolderClick(id);
    // await this.renderFileByFolderClick(id);
  };
  createFolderGrid() {
    let folderGrid = new GridItem({
      listItem: this.listFolder,
      type: "Folder",
      title: "Folder",
      className: "folder",
      handleOpenFolder: this.handleOpenFolder,
      onDropFolder: this.dropFileToFolder
    });

    return folderGrid;
  }

  handleDropFile = async file => {
    let parentFolder = this.breadCrumb.getCurrentBreadCrumb() ? this.breadCrumb.getCurrentBreadCrumb().id : "0";
    this.spinner.showSpinner();
    let responseAllRecord = await util.file.addFile(file, parentFolder);
    this.setValueFileOrFolderList(responseAllRecord.records);
    this.spinner.hideSpinner();
    let newFile = responseAllRecord.records[0];
    this.fileGrid.reRenderFile(newFile);
  };

  createFileGrid() {
    let fileGrid = new GridItem({
      listItem: this.listFile,
      type: "File",
      title: "File",
      className: "file",
      onDropFile: this.handleDropFile,
      onSelectFile: this.selectFile
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
