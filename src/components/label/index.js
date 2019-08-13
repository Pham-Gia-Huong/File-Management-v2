import "./index.css";

class Label {
  constructor(props) {
    this.props = props;
  }
  render() {
    let propsClass = "";
    if (this.props.className) {
      propsClass = this.props.className;
    }
    let label = document.createElement("label");
    label.textContent = this.props.name;
    label.className = "label " + propsClass;
    label.style.fontSize = this.props.fontSize;
    label.style.fontWeight = this.props.fontWeight;
    return label;
  }
}
export default Label;
