class Spinner {
  constructor() {
    this.spinnerWrapper = document.createElement("div");
  }
  showSpinner() {
    this.spinnerWrapper.className = "layout-center";

    let spinner = document.createElement("div");
    spinner.className = "lds-dual-ring";
    this.spinnerWrapper.appendChild(spinner);

    document.body.appendChild(this.spinnerWrapper);
  }
  hideSpinner() {
    document.body.removeChild(this.spinnerWrapper);
  }
}
export default Spinner;
