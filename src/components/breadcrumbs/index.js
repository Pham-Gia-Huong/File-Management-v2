import "./index.css";
class BreadCrumbs {
  constructor(props) {
    this.props = props;
    this.breadCrumbWrapper = document.createElement("div");
  }
  setListFolder(folderId) {
    let indexFolder = this.props.arrFolder.findIndex(folder => folder.id === folderId);
    let lastIndex = this.props.arrFolder.length - 1;
    if (lastIndex === indexFolder) {
      return;
    }
    let newlistFolder = this.props.arrFolder.slice(0, indexFolder + 1);
    return newlistFolder;
  }
  removeBreadCrumb(elmNameAndArrow) {
    let indexElement = [...this.breadCrumbWrapper.children].indexOf(elmNameAndArrow);
    let elmChildWrap = this.breadCrumbWrapper.children;
    for (let i = elmChildWrap.length - 1; i >= 0; i--) {
      if (i > indexElement) {
        this.breadCrumbWrapper.removeChild(elmChildWrap[i]);
      }
    }
    let elmLastArrow = elmChildWrap[elmChildWrap.length - 1];
    let isLastArrowExist = elmLastArrow && elmLastArrow.children[1];
    if (isLastArrowExist) {
      elmLastArrow.removeChild(elmLastArrow.children[1]);
    }
  }
  handleSelected(elmNameAndArrow, folderId) {
    this.removeBreadCrumb(elmNameAndArrow);
    this.setListFolder(folderId);
  }

  renderArrowDom(nameAndArrow, folder, elmFolderName) {
    nameAndArrow.appendChild(elmFolderName);
    let arrowRight = document.createElement("div");
    arrowRight.textContent = ">";
    let isNotLastElm = folder.id !== this.props.arrFolder.length - 1;
    if (isNotLastElm) {
      nameAndArrow.appendChild(arrowRight);
    }
  }

  renderItemBreadCrumb() {
    if (this.props.arrFolder && this.props.arrFolder.length === 0) {
      return;
    }
    this.props.arrFolder.map(folder => {
      let nameAndArrow = document.createElement("div");
      nameAndArrow.className = "name-arrow";

      let elmFolderName = document.createElement("div");
      elmFolderName.className = "bread-crumb-name";
      elmFolderName.textContent = folder.name;

      this.renderArrowDom(nameAndArrow, folder, elmFolderName);

      elmFolderName.onclick = () => this.handleSelected(nameAndArrow, folder.id);
      this.breadCrumbWrapper.appendChild(nameAndArrow);
    });
  }
  render() {
    this.breadCrumbWrapper.className = "bread-crumb-wrap";
    this.renderItemBreadCrumb();

    return this.breadCrumbWrapper;
  }
}
export default BreadCrumbs;
