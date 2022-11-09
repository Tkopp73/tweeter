

$(document).ready(() => {

  const textArea  = document.querySelector("textarea");
  const output = document.querySelector("output");
  console.log("hello world");
  textArea.addEventListener(('input'), (e) => {
    let outputCount = 140;
    let length = textArea.value.length;
    let total = outputCount - length;
    if (total < 0) {
      $(output).css('color', 'red');
    } else {
      $(output).css('color', "#2c2c2c");
    }
    output.innerHTML = total
  });

});