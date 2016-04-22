# javascript-racer-tutorial
## Build a two player racing game with HTML, CSS and Javascript.

### 1. index.html:
First, we need to set up the basic environment. Create an index.html document and fill it with the following boilerplate HTML code.
```
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <title>Javascript Racer</title>
    <link rel="stylesheet" type="text/css" href="https://necolas.github.io/normalize.css/3.0.2/normalize.css">
  </head>
  <body>
  </body>
</html>
```
This will all be pretty familiar stuff to you at this point, possibly with the exception of `href="https://necolas.github.io/normalize.css/3.0.2/normalize.css">`.
This line simply calls in a CSS script that 'normalizes' our stylesheet. It means that we don't need to worry about any unexpected styling rules spoiling our fun.

Next, we'll set up an HTML `<table>` element, with two rows (`<tr>`), and eight cells (`<td>`) each. We'll give these elements some nice, descriptive IDs and classes. That'll make it easier to select them later on when we start using our Javascript. Add the following code into the `<body>  </body>` section of your HTML.
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
This concludes our basic HTML setup. If you want, you can now open index.html in chrome and inspect your masterpiece. So far, admittedly, it is a little underwhelming... You will be able to see the header, but the table is invisible. This is because we have no styling what-so-ever, so let's add an `index.css` file and get it looking pretty.

### 1. index.css:
Create an index.css file, and give it the following rules:
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
Here we are doing three things. First, we're setting all of our cells (`<tr>`) to be LightGrey, and giving them the size of 100px by 100px. Now our cells will exist physically, and we'll be able to distinguish them from the white background. Next, we set our player colors. I've entered red and blue, but you can set them to any color you fancy.

Now, there's one more step here before we can actually see this on our page. We need to add a reference to our `index.css` file in the `<head> ... </head>` element of our `index.html` document. Let's do that now.

```
<head>
  ...
  <link rel="stylesheet" type="text/css" href="https://necolas.github.io/normalize.css/3.0.2/normalize.css">
  <link rel="stylesheet" type="text/css" href="index.css">
  ...
</head>
```

Notice how it's placed below the normalize.css reference. It's probably important to do it in this order. I haven't tested it, but I am scared that we could potentially normalize our index.css if we did it the other way around!
Open up index.html in chrome now and you should be able to see your beautiful rows and cells. Now let's make them do something.

1. index.js:
```
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keyup', handleKeyPress, false)
})

function handleKeyPress (e) {
  if (e.which == 81) {
    movePlayer(1)
  }

  if (e.which == 80) {
    movePlayer(2)
  }
}

function movePlayer (playerInt) {
  var row = document.getElementById('player' + playerInt + '_strip')
  var cell = document.getElementsByClassName('active' + playerInt)
  var nextCell = row.cells[cell[0].cellIndex + 1]

  checkForVictory(nextCell, playerInt)

  cell[0].className = ''
  nextCell.className = 'active' + playerInt
}

function checkForVictory (nextCell, playerInt) {
  if (nextCell === undefined) {
    alert('Player ' + playerInt + ' wins!')
    window.location.reload()
  }
}
  ```
