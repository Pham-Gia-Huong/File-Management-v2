import "./index.css";
class Button {
  constructor(props) {
    this.button = document.createElement("button");
    this.className = props.className;
    this.name = props.name;
    this.style = props.style ? { ...props.style } : null;
    this.onClick = props.onClick;
    this.onMousedown = props.onMousedown || function() {};
  }
  hide = () => {
    this.button.style.display = "none";
  };
  show = () => {
    this.button.style.display = "initial";
  };
  disable = () => {
    this.button.style.cursor = "initial";
    this.button.style.pointerEvents = "none";
    this.button.style.opacity = 0.5;
  };
  enble = () => {
    this.button.style.cursor = "pointer";
    this.button.style.pointerEvents = "initial";
    this.button.style.opacity = 1;
  };
  render() {
    let classProps = "";
    if (this.className) {
      classProps = this.className;
    }
    this.button.className = "button " + classProps;
    this.button.textContent = this.name;
    this.button.onclick = this.onClick;
    this.button.onmousedown = () => {
      this.onMousedown();
    };
    if (this.style) {
      this.button.style.background = this.style.background;
      this.button.style.color = this.style.color;
    }

    return this.button;
  }
}
export default Button;
