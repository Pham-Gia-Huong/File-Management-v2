import "./index.css";
class BreadCrumbs {
  constructor(props) {
    this.listBreadCrumb = [...props.listBreadCrumb];
    this.propOnSelected = props.onSelected;
    this.breadCrumbWrapper = document.createElement("div");
  }
  getCurrentBreadCrumb() {
    return this.listBreadCrumb[this.listBreadCrumb.length - 1];
  }
  reRenderBreadCrumb(listBreadCrumb) {
    this.resetBreadCrumb();
    this.listBreadCrumb = listBreadCrumb;
    this.renderItemBreadCrumb();
    this.removeLastArrow();
  }
  resetBreadCrumb() {
    let childBreadcrumb = this.breadCrumbWrapper.children;
    for (let i = childBreadcrumb.length - 1; i >= 0; i--) {
      this.breadCrumbWrapper.removeChild(childBreadcrumb[i]);
    }
  }
  // setListFolder(folderId) {
  //   let indexFolder = this.listBreadCrumb.findIndex(folder => folder.id === folderId);
  //   let lastIndex = this.listBreadCrumb.length - 1;
  //   if (lastIndex === indexFolder) {
  //     return;
  //   }
  //   this.listBreadCrumb = this.listBreadCrumb.slice(0, indexFolder + 1);
  // }
  removeLastArrow() {
    let elmChildWrap = this.breadCrumbWrapper.children;

    let elmLastArrow = elmChildWrap[elmChildWrap.length - 1];
    let isLastArrowExist = elmLastArrow && elmLastArrow.children[1];
    if (isLastArrowExist) {
      elmLastArrow.removeChild(elmLastArrow.children[1]);
    }
  }
  removeBreadCrumb(elmNameAndArrow) {
    let indexElement = [...this.breadCrumbWrapper.children].indexOf(elmNameAndArrow);
    let elmChildWrap = this.breadCrumbWrapper.children;
    for (let i = elmChildWrap.length - 1; i >= 0; i--) {
      if (i > indexElement) {
        this.breadCrumbWrapper.removeChild(elmChildWrap[i]);
      }
    }
    this.removeLastArrow();
  }
  addBreadCrumb(id, name) {
    this.listBreadCrumb.push({ id, name });
    this.reRenderBreadCrumb(this.listBreadCrumb);
  }
  handleSelected(elmNameAndArrow, breadCrumId) {
    this.removeBreadCrumb(elmNameAndArrow, breadCrumId);
    let indexBreadCrumb = this.listBreadCrumb.findIndex(breadCrumb => breadCrumb.id === breadCrumId);
    let newListBreadCrumb = this.listBreadCrumb.slice(0, indexBreadCrumb + 1);
    this.listBreadCrumb = newListBreadCrumb;
    let currentBreadCrumb = this.getCurrentBreadCrumb();
    this.propOnSelected(currentBreadCrumb);
  }

  renderArrowDom(nameAndArrow, folder) {
    let arrowRight = document.createElement("div");
    arrowRight.textContent = ">";

    let isNotLastElm = folder.id !== this.listBreadCrumb.length - 1;
    if (isNotLastElm) {
      nameAndArrow.appendChild(arrowRight);
    }
  }

  renderItemBreadCrumb() {
    if (this.listBreadCrumb && this.listBreadCrumb.length === 0) {
      return;
    }
    this.listBreadCrumb.map(breadCrumb => {
      let nameAndArrow = document.createElement("div");
      nameAndArrow.className = "name-arrow";

      let elmFolderName = document.createElement("div");
      elmFolderName.className = "bread-crumb-name";
      elmFolderName.textContent = breadCrumb.name;
      nameAndArrow.appendChild(elmFolderName);

      this.renderArrowDom(nameAndArrow, breadCrumb);

      elmFolderName.onclick = () => this.handleSelected(nameAndArrow, breadCrumb.id);
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
