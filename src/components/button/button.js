import "./index.css";
class Button {
  constructor(props) {
    this.props = props;
  }
  render() {
    let classProps = "";
    if (this.props.className) {
      classProps = this.props.className;
    }
    let button = document.createElement("button");
    button.className = "button " + classProps;
    button.textContent = this.props.name;
    button.onclick = this.props.onClick;
    if (this.props.style) {
      button.style.background = this.props.style.background;
      button.style.color = this.props.style.color;
    }

    return button;
  }
}
export default Button;
