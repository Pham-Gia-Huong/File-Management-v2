class Spinner {
  constructor() {
    this.spinnerWrapper;
  }
  showSpinner() {
    this.spinnerWrapper = document.createElement("div");
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
