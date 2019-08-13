import Label from "../label";
import "./index.css";
import Icon from "../Icon";
class File {
  constructor(props) {
    this.props = props;
    this.fileName = new Label({ name: this.props.name, className: "file-label" });
  }
  handleSelectedFile(fileLayout) {
    let parentFileLayout = fileLayout.parentNode.children;
    for (let i = 0; i < parentFileLayout.length; i++) {
      let currentLabelFileItem = parentFileLayout[i].children[0].children[1];
      if (parentFileLayout[i] === fileLayout) {
        currentLabelFileItem.classList.add("selected-file");
      } else {
        currentLabelFileItem.classList.remove("selected-file");
      }
    }
  }
  render() {
    let fileLayout = document.createElement("div");
    fileLayout.className = "file-layout";

    let fileItem = document.createElement("div");
    fileItem.className = "file-item";
    let fileImage = "";
    let elmFileImage = "";

    if (this.props.type !== "default") {
      fileImage = new Icon({
        icon: this.props.image,
        fontSize: "50px"
      });

      elmFileImage = fileImage.render();
    } else {
      fileImage = document.createElement("img");
      fileImage.src = this.props.image;
      fileImage.width = this.props.width;
      fileImage.height = this.props.height;
      elmFileImage = fileImage;
    }

    fileItem.appendChild(elmFileImage);
    let elmFileName = this.fileName.render();
    fileItem.appendChild(elmFileName);

    fileItem.onclick = () => this.handleSelectedFile(fileLayout);
    fileLayout.appendChild(fileItem);
    return fileLayout;
  }
}
export default File;
