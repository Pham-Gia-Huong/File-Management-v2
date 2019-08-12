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
      propsClass = this.props.className;
    }
    icon.className = this.props.icon + " " + propsClass;
    icon.style.fontSize = this.props.fontSize;

    return icon;
  }
}
export default Icon;
