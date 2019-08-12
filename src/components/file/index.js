import Label from "../label";
import "./index.css";
import Icon from "../Icon";
class File {
  constructor(props) {
    this.props = props;
    this.title = new Label({ name: "File", fontSize: "20px", fontWeight: "bold" });
  }

  render() {
    let fileLayout = document.createElement("div");
    fileLayout.className = "file-layout";

    let fileItem = document.createElement("div");
    fileItem.className = "file-item";
    fileItem.onclick = () => this.props.onClick();
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

    let labelFile = "file-label";
    let fileName = new Label({ name: this.props.name, className: labelFile });
    let elmFileName = fileName.render();
    fileItem.appendChild(elmFileName);

    fileLayout.appendChild(fileItem);
    return fileLayout;
  }
}
export default File;
