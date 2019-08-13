import "./index.css";
class BreadCrumbs {
  constructor(props) {
    this.props = props;
    this.breadCrumbWrap = document.createElement("div");
  }
  setListFolder(arrFolder, folderId) {
    let indexFolder = arrFolder.findIndex(folder => folder.id === folderId);
    let lastIndex = arrFolder.length - 1;
    if (lastIndex === indexFolder) {
      return;
    }
    let newlistFolder = arrFolder.slice(0, indexFolder + 1);
    return newlistFolder;
  }
  removeBreadCrumb(elmNameAndArrow) {
    let indexElement = [...this.breadCrumbWrap.children].indexOf(elmNameAndArrow);
    let elmChildWrap = this.breadCrumbWrap.children;
    for (let i = elmChildWrap.length - 1; i >= 0; i--) {
      if (i > indexElement) {
        this.breadCrumbWrap.removeChild(elmChildWrap[i]);
      }
    }
    let elmLastArrow = elmChildWrap[elmChildWrap.length - 1];
    let isArrowExist = elmLastArrow && elmLastArrow.children[1];
    if (isArrowExist) {
      elmLastArrow.removeChild(elmLastArrow.children[1]);
    }
  }
  handleSelected(elmNameAndArrow, arrFolder, folderId) {
    this.removeBreadCrumb(elmNameAndArrow);
    this.setListFolder(arrFolder, folderId);
  }

  renderItemBreadCrumb(arrFolder) {
    if (arrFolder && arrFolder.length === 0) {
      return;
    }
    arrFolder.map(folder => {
      let nameAndArrow = document.createElement("div");
      nameAndArrow.className = "name-arrow";

      let elmFolderName = document.createElement("div");
      elmFolderName.className = "bread-crumb-name";
      elmFolderName.textContent = folder.name;

      nameAndArrow.appendChild(elmFolderName);
      let arrowRight = document.createElement("div");
      arrowRight.textContent = ">";
      let isNotLastElm = folder.id !== arrFolder.length - 1;
      if (isNotLastElm) {
        nameAndArrow.appendChild(arrowRight);
      }

      elmFolderName.onclick = () => this.handleSelected(nameAndArrow, arrFolder, folder.id);
      this.breadCrumbWrap.appendChild(nameAndArrow);
    });
  }
  render() {
    this.breadCrumbWrap.className = "bread-crumb-wrap";
    this.renderItemBreadCrumb(this.props.arrFolder);

    return this.breadCrumbWrap;
  }
}
export default BreadCrumbs;
