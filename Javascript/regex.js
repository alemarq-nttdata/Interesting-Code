/*
<!DOCTYPE html>
<html>
  <body>
    <h1>Display a Number Field</h1>

    <form action="/action_page.php">
      <label for="quantity">Quantity (between 1 and 5):</label>
      <input
        type="text"
        id="quantity"
        name="quantity"
        onkeypress="validate(event, this)"
      />
      <input type="submit" />
    </form>
    <script>*/
      function validate(evt, ele) {
        let theEvent = evt || window.event;
        let key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        let value = ele.value + key;
        let regex = /^\d+(,\d{0,2})?$/;
        if (!regex.test(value)) {
          theEvent.returnValue = false;
          if (theEvent.preventDefault) theEvent.preventDefault();
        }
      }
      /*
    </script>
  </body>
</html>
*/
