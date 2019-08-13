import "./index.css";
class Icon {
  constructor(props) {
    this.props = props;
  }

  render() {
    let icon = document.createElement("div");
    icon.className = this.props.icon + " icon ";

    return icon;
  }
}
export default Icon;
