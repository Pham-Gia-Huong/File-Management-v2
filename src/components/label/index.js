import "./index.css";

class Label {
  constructor(props) {
    this.className = props.className;
    this.name = props.name;
    this.size = props.fontSize;
    this.weight = props.fontWeight;
    this.title = props.title;
    this.label = document.createElement("label");
  }
  setStyle = style => {
    for (const key in style) {
      if (style.hasOwnProperty(key)) {
        this.label.style[key] = style[key];
      }
    }
  };
  render() {
    let propsClass = "";
    if (this.className) {
      propsClass = this.className;
    }
    this.label.textContent = this.name;
    this.label.className = "label " + propsClass;
    this.label.style.fontSize = this.size;
    this.label.style.fontWeight = this.weight;
    return this.label;
  }
}
export default Label;
