import "./index.css";
class Icon {
  constructor(props) {
    this.propIcon = props.icon;
  }

  render() {
    let icon = document.createElement("div");
    icon.className = this.propIcon + " icon ";

    return icon;
  }
}
export default Icon;
