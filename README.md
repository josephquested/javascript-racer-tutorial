# javascript-racer-tutorial
## Build a two player racing game with HTML, CSS and Javascript.

###1. index.html:
First, we need to set up the basic environment. Create an index.html document and fill it with the following boilerplate HTML code.
```
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <title>Javascript Racer</title>
    <link rel="stylesheet" type="text/css" href="https://necolas.github.io/normalize.css/3.0.2/normalize.css">
    <link rel="stylesheet" type="text/css" href="index.css">
  </head>
  <body>
  </body>
</html>
```
This will all be pretty familiar stuff to you at this point, possibly with the exception of `href="https://necolas.github.io/normalize.css/3.0.2/normalize.css">`.
 This line simply calls in a CSS script that 'normalizes' our stylesheet. It means that we don't need to worry about any unexpected styling rules spoiling our fun.

1. index.css:
```
.racer_table td {
  background-color: LightGrey;
  height: 100px;
  width: 100px;
}

.racer_table td.active {
  background-color: black;
}
```

1. create index.js:
```
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keyup', handleKeyPress, false)

})

function handleKeyPress (e) {
  if (e.which == 81) {
      console.log('player1')
      // player = "player1";
    }

  if (e.which == 80) {
    console.log('player2')
    // player = "player2";
  }
}

  ```
