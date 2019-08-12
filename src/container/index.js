import File from "../file";
import BreadCrumbs from "../components/breadcrumbs";

class Container {
  constructor(props) {
    this.props = props;
    this.file = new File();
  }
  handleSelecBread(e) {
    console.log(e);
  }
  renderBreadCrumb() {
    let elmSpace = kintone.app.getHeaderSpaceElement();

    let breadCrumbs = new BreadCrumbs({
      arrFolderName: ["abc", "def", 3, 4],
      elmSpace,
      onClick: this.handleSelecBread
    });
    breadCrumbs.render();
  }
  render() {}
}
export default Container;
