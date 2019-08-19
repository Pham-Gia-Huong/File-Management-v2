class InputFile {
  constructor(props) {
    this.onChange = props.onChange;
    this.elmFileInput = {};
  }
  render() {
    let elmWrap = document.createElement("div");
    elmWrap.className = "wrap";

    let elmInputLabel = document.createElement("div");
    elmInputLabel.textContent = "File";
    elmWrap.appendChild(elmInputLabel);

    this.elmFileInput = document.createElement("input");
    this.elmFileInput.type = "file";
    this.elmFileInput.className = "wrap_input";
    this.elmFileInput.accept = ".xls,.xlsx,.png,.jpg,.jpeg,.pdf,.doc";
    elmWrap.appendChild(this.elmFileInput);

    this.elmFileInput.addEventListener("change", () => this.onChange(this.elmFileInput.files[0]));
    return elmWrap;
  }
}
export default InputFile;
