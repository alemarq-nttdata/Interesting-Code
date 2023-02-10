// Regex input number and decimals only, not string
<input type="number" onkeypress="inpNum(event)" />

function inpNum(e) {
  e = e || window.event;
  var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
  var charStr = String.fromCharCode(charCode);
  if (!charStr.match(/^[\d|\.|\,]+/))
    e.preventDefault();
}