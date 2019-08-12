class Spinner {
  render() {
    let spinnerWrapper = document.createElement("div");
    spinnerWrapper.className = "layout-center";

    let spinner = document.createElement("div");
    spinner.className = "lds-dual-ring";
    spinnerWrapper.appendChild(spinner);

    return spinnerWrapper;
  }
}
