import "./index.css";
class BreadCrumbs {
  constructor(props) {
    this.props = props;
  }
  renderItemBreadCrumb(breadCrumbWrap, arrFolder) {
    if (arrFolder && arrFolder.length === 0) {
      return;
    }
    return this.props.arrFolder.map(folder => {
      let nameAndArrow = document.createElement("div");
      nameAndArrow.className = "name-arrow";

      let elmFolderName = document.createElement("div");
      elmFolderName.className = "bread-crumb-name";
      elmFolderName.textContent = folder.name;
      elmFolderName.onclick = () => this.props.onClick(folder.name);

      nameAndArrow.appendChild(elmFolderName);
      let arrowRight = document.createElement("div");
      arrowRight.textContent = ">";
      if (folder.id !== arrFolder.length - 1) {
        nameAndArrow.appendChild(arrowRight);
      }

      breadCrumbWrap.appendChild(nameAndArrow);
    });
  }
  render() {
    let breadCrumbWrap = document.createElement("div");
    breadCrumbWrap.className = "bread-crumb-wrap";

    this.renderItemBreadCrumb(breadCrumbWrap, this.props.arrFolder);

    return breadCrumbWrap;
  }
}
export default BreadCrumbs;
