import "./index.css";
class BreadCrumbs {
  constructor(props) {
    this.breadCrumbWrapper = document.createElement("div");
    this.listBreadCrumb = [...props.listBreadCrumb];
    this.OnSelected = props.onSelected;
  }

  getCurrentBreadCrumb() {
    return this.listBreadCrumb[this.listBreadCrumb.length - 1];
  }

  getPreviousBreadCrum() {
    return this.listBreadCrumb[this.listBreadCrumb.length - 2];
  }

  reRenderBreadCrumb() {
    this.resetBreadCrumb();
    this.renderItemBreadCrumb();
    this.removeLastArrow();
  }

  resetBreadCrumb() {
    let childBreadcrumb = this.breadCrumbWrapper.children;
    for (let i = childBreadcrumb.length - 1; i >= 0; i--) {
      this.breadCrumbWrapper.removeChild(childBreadcrumb[i]);
    }
  }

  removeLastArrow() {
    let elmChildWrap = this.breadCrumbWrapper.children;
    let elmLastArrow = elmChildWrap[elmChildWrap.length - 1];

    let isLastArrowExist = elmLastArrow && elmLastArrow.children[1];
    if (isLastArrowExist) {
      elmLastArrow.removeChild(elmLastArrow.children[1]);
    }
  }

  removeBreadCrumb(elmNameAndArrow) {
    let elmIndex = [...this.breadCrumbWrapper.children].indexOf(elmNameAndArrow);
    let elmChildWrapper = this.breadCrumbWrapper.children;
    for (let i = elmChildWrapper.length - 1; i >= 0; i--) {
      if (i > elmIndex) {
        this.breadCrumbWrapper.removeChild(elmChildWrapper[i]);
      }
    }
  }
  addBreadCrumb(id, name) {
    this.listBreadCrumb.push({ id, name });
    this.reRenderBreadCrumb();
  }
  handleSelect(elmNameAndArrow, breadCrumId) {
    this.removeBreadCrumb(elmNameAndArrow, breadCrumId);
    this.removeLastArrow();
    let indexBreadCrumb = this.listBreadCrumb.findIndex(breadCrumb => breadCrumb.id === breadCrumId);
    let newListBreadCrumb = this.listBreadCrumb.slice(0, indexBreadCrumb + 1);
    this.listBreadCrumb = newListBreadCrumb;
    let currentBreadCrumb = this.getCurrentBreadCrumb();
    this.OnSelected(currentBreadCrumb);
  }

  renderArrow(nameAndArrow, folder) {
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

      this.renderArrow(nameAndArrow, breadCrumb);

      elmFolderName.onclick = () => this.handleSelect(nameAndArrow, breadCrumb.id);
      this.breadCrumbWrapper.appendChild(nameAndArrow);
    });
  }
  render() {
    this.breadCrumbWrapper.className = "bread-crumb-wrap";
    this.renderItemBreadCrumb();
    this.removeLastArrow();
    return this.breadCrumbWrapper;
  }
}
export default BreadCrumbs;
