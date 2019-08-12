import "./index.css";
class Icon {
  constructor(props) {
    this.props = props;
  }

  render() {
    let propsClass = "";
    let icon = document.createElement("div");
    icon.style.marginRight = this.props.marginRight;

    if (this.props.className) {
      propsClass == this.props.className;
    }
    if (this.props.type !== "default") {
      icon.className = this.props.src + " " + propsClass;
      icon.style.fontSize = this.props.fontSize;
      return icon;
    }

    icon = document.createElement("img");
    icon.src = this.props.src;
    icon.className = "image " + propsClass;
    icon.width = this.props.width;
    icon.height = this.props.height;
    return icon;
  }
}
export default Icon;
