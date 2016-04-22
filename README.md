# javascript-racer-tutorial
## Build a two player racing game with HTML, CSS and Javascript.

### 1. index.html:
1. First, we need to set up the basic environment. Create an index.html document and fill it with the following boilerplate HTML code.
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

 1. Next, we'll set up an HTML `<table>` element, with two rows (`<tr>`), and eight cells (`<td>`) each. We'll give these elements some nice, descriptive classes. That'll make it easier to select them later on when we start using our Javascript. Add the following code into the `<body>  </body>` section of your HTML.
 ```
 <h1>Javascript Racer</h1>
 <table class="racer_table">
   <tr id="player1_strip">
     <td class="active1"></td>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
   </tr>
   <tr id="player2_strip">
     <td class="active2"></td>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
   </tr>
 </table>
 ```

### 1. index.css:
```
.racer_table td {
  background-color: LightGrey;
  height: 100px;
  width: 100px;
}

.racer_table td.active1 {
  background-color: red;
}

.racer_table td.active2 {
  background-color: blue;
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
