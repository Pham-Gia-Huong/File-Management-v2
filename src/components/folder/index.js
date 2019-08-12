import Ultil from "../../ultil/index";
import { required } from "../../constant/index";
import Icon from "../icon/icon";
import Label from "../label";
import "./index.css";

class Folder {
  constructor(props) {
    this.props = props;
    this.icon = new Icon({
      src: props.src,
      fontSize: props.style.fontIcon,
      marginRight: props.style.marginRight
    });

    this.folderName = new Label({ name: props.name, fontSize: props.style.fontSize });
  }
  render() {
    let folder = document.createElement("div");
    folder.className = "folder";

    let icon = this.icon.render();
    folder.appendChild(icon);

    let folderName = this.folderName.render();
    let nameItem = folderName.textContent;
    folder.appendChild(folderName);

    folder.onclick = () => this.props.onClick(nameItem);
    return folder;
  }
}
export default Folder;
