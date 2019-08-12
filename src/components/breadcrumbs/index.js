import "./index.css";
class BreadCrumbs {
  constructor(props) {
    this.arrFolder = props.arrFolderName;
    this.props = props;
  }
  renderItemBreadCrumb(breadCrumbWrap, arrFolderName) {
    if (arrFolderName && arrFolderName.length === 0) {
      return;
    }
    return this.props.arrFolderName.map(nameFolder => {
      let nameAndArrow = document.createElement("div");
      nameAndArrow.className = "name-arrow";

      let elmFolderName = document.createElement("div");
      elmFolderName.className = "bread-crumb-name";
      elmFolderName.textContent = nameFolder;
      elmFolderName.onclick = () => this.props.onClick(nameFolder);
      nameAndArrow.appendChild(elmFolderName);

      let arrowRight = document.createElement("div");
      arrowRight.textContent = ">";
      nameAndArrow.appendChild(arrowRight);

      breadCrumbWrap.appendChild(nameAndArrow);
    });
  }
  createBreadCrumbs(arrFolderName) {
    let breadCrumbWrap = document.createElement("div");
    breadCrumbWrap.className = "bread-crumb-wrap";

    this.renderItemBreadCrumb(breadCrumbWrap, arrFolderName);

    return breadCrumbWrap;
  }
  render() {
    let elmBreadCrumbs = this.createBreadCrumbs();
    this.props.elmSpace.appendChild(elmBreadCrumbs);
  }
}
export default BreadCrumbs;
