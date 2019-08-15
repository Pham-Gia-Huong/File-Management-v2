import "./index.css";

class Label {
  constructor(props) {
    this.propClass = props.className;
    this.propName = props.name;
    this.propSize = props.fontSize;
    this.propWeight = props.fontWeight;
  }
  render() {
    let propsClass = "";
    if (this.propClass) {
      propsClass = this.propClass;
    }
    let label = document.createElement("label");
    label.textContent = this.propName;
    label.className = "label " + propsClass;
    label.style.fontSize = this.propSize;
    label.style.fontWeight = this.propWeight;
    return label;
  }
}
export default Label;
