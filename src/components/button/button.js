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
    button.onClick = this.props.onClick;
    return button;
  }
}
export default Button;
