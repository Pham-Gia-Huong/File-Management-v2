import "./index.css";
class DropDown {
  constructor(props) {
    this.elmContainer;
    this.elmDropDown;
    this.name = props.name;
    this.selected;
  }
  getSelected() {
    return this.selected;
  }
  render() {
    this.elmContainer = document.createElement("div");
    this.elmContainer.className = "dropdown-container";
    this.elmContainer.style.display = "block";

    let elmTitleAndRequire = document.createElement("div");
    elmTitleAndRequire.className = "kintoneplugin-label";
    this.elmContainer.appendChild(elmTitleAndRequire);

    let name = document.createElement("span");
    name.className = "container_label";
    name.textContent = this.name;
    elmTitleAndRequire.appendChild(name);

    let require = document.createElement("span");
    require.className = "kintoneplugin-require";
    require.textContent = " *";
    elmTitleAndRequire.appendChild(require);

    let description = document.createElement("div");
    description.className = "kintoneplugin-row";
    description.textContent = this.description;
    this.elmContainer.appendChild(description);

    let dropdownOutner = document.createElement("div");
    dropdownOutner.className = "kintoneplugin-select-outer";
    this.elmContainer.appendChild(dropdownOutner);

    let dropdownInner = document.createElement("div");
    dropdownInner.className = "kintoneplugin-select";
    dropdownOutner.appendChild(dropdownInner);

    this.selected = document.createElement("select");
    dropdownInner.appendChild(this.selected);

    let option = document.createElement("option");
    option.value = "";
    option.textContent = "-----";
    this.selected.appendChild(option);

    return this.elmContainer;
  }
}
export default DropDown;
