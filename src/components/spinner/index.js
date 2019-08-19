class Spinner {
  constructor() {
    this.spinnerWrapper;
  }
  showSpinner() {
    this.spinnerWrapper = document.createElement("div");
    this.spinnerWrapper.className = "layout-center";

    this.spinner = document.createElement("div");
    this.spinner.className = "lds-dual-ring";
    this.spinnerWrapper.appendChild(this.spinner);

    document.body.appendChild(this.spinnerWrapper);
  }
  hideSpinner() {
    document.body.removeChild(this.spinnerWrapper);
  }
}
export default Spinner;
