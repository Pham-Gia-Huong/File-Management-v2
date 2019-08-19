import "./index.css";
class Icon {
  constructor(props) {
    this.icon = props.icon;
    this.elmIcon = document.createElement("div");
  }
  setAttribute(name, value) {
    this.elmIcon.setAttribute(name, value);
  }
  render() {
    this.elmIcon.className = this.icon + " icon ";

    return this.elmIcon;
  }
}
export default Icon;
