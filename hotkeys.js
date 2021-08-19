document.selectedResultId = -1;
document.arrowActive = false;

function removePointer() {
  document.arrowActive = false;

  const resultPointer = document.getElementById("result-pointer");
  if (resultPointer != null) {
    resultPointer.remove();
  }
}

function selectResult(id) {
  const elements = document.querySelectorAll("div.g h3");
  if (id < 0 || id >= elements.length) {
    // Out of bounds
    return;
  }

  removePointer();

  document.selectedResultId = id;

  const element = elements[id];
  const link    = element.firstElementChild;

  document.arrowActive = true;
  element.innerHTML = "<div id='result-pointer' style='position: absolute; left: -15px;'>&gt;</div>" + element.innerHTML;
  link.focus();
}

document.onkeyup = function(event) {
  if (event.keyCode == 38) {
    selectResult(document.selectedResultId - 1);
    event.preventDefault();
  } else if (event.keyCode == 40) {
    selectResult(document.selectedResultId + 1);
    event.preventDefault();
  } else if (event.keyCode == 13 && document.arrowActive) {
    const element = document.querySelectorAll("div.g h3")[document.selectedResultId];
    const link    = element.parentElement;
    const url     = link.href;

    if (event.ctrlKey) {
      const win = window.open(url, "_blank");
      win.blur();
      window.open().close();
    } else {
      document.location = url;
    }
  } else {
    removePointer();
  }
}

document.onclick = removePointer;

console.log("Loaded Google Hotkeys Extension");
