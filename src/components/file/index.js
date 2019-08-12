import Label from "../label";
import Icon from "../icon/icon";
import "./index.css";
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
    let fileIcon = new Icon({
      src: this.props.src,
      type: this.props.type,
      width: this.props.width,
      height: this.props.height
    });
    let elmFileIcon = fileIcon.render();
    fileItem.appendChild(elmFileIcon);

    let labelFile = "file-label";
    let fileName = new Label({ name: this.props.name, className: labelFile });
    let elmFileName = fileName.render();
    fileItem.appendChild(elmFileName);

    fileLayout.appendChild(fileItem);
    return fileLayout;
  }
}
export default File;
