import Ultil from "../../ultil/index";
import { required } from "../../constant/index";
import Icon from "../Icon";
import Label from "../label";
import "./index.css";

class Folder {
  constructor(props) {
    this.props = props;
    this.icon = new Icon({
      icon: "fas fa-folder"
    });

    this.folderName = new Label({ name: props.name, fontSize: "20px" });
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
