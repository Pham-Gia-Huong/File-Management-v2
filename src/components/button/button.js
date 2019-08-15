import "./index.css";
class Button {
  constructor(props) {
    this.props = props;
    this.propsClassName = props.className;
    this.propStyle = { ...props.style };
  }
  render() {
    let classProps = "";
    if (this.propsClassName) {
      classProps = this.propsClassName;
    }
    let button = document.createElement("button");
    button.className = "button " + classProps;
    button.textContent = this.props.name;
    button.onclick = this.props.onClick;
    if (this.propStyle) {
      button.style.background = this.propStyle.background;
      button.style.color = this.propStyle.color;
    }

    return button;
  }
}
export default Button;
