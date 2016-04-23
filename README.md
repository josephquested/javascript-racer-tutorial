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

### 2. index.css:
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

### 3. index.js:
#### Setting up the event listeners
Create an index.js file, and start it off with the following three lines:

```
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keyup', handleKeyPress)
})
```

So let's go through this piece by piece:

```
document.addEventListener('DOMContentLoaded', function () {
```
First we're calling on the `document` object. You can read more about it [here](http://www.w3schools.com/jsref/dom_obj_document.asp), essentially it's the owner of all our HTML elements. It has a function called `addEventListener`, that we can use to detect and respond to various events. We call it with the `DOMContentLoaded` argument, then open up an anonymous `function ()`. This ensures that any code we place inside our anonymous function won't run until _after_ the HTML DOM is loaded. This prevents awkward situations where we try to do something to an HTML node, but the node hasn't been created yet.

```
document.addEventListener('keyup', handleKeyPress)
```
Next we add another event listener. `keyup`. This one listens for keyboard presses. More specifically; it listens for when you press a key, and then let go of it again. If we were just listening for when a key was pressed down, the race would be over within a split second. You could just hold down a key and your little racer would essentially teleport right to the end, because computers, it turns out, can process events really quickly.

Then we call a function. The function is called `handleKeyPress`, and it will be called whenever the `keyup` event occurs. But, here's the problem: `handleKeyPress` doesn't actually exist. We need to create it, so let's do that now.

#### Handling key presses

```
function handleKeyPress (e) {
  if (e.which == 81) {
    movePlayer(1)
  }

  if (e.which == 80) {
    movePlayer(2)
  }
}
```
So here's something interesting right off the bat. `function handleKeyPress (e) { `
The function takes an `e` parameter, but we're not passing it any arguments when we call it up on line 2! What's that about? Well, remember how it's being called inside the `document.addEventListener` function? That `e` stands for *e*-vent. It's an object that gets created when our `keydown `function is triggered, and it contains some useful information that gets automatically passed into our `handleKeyPress` function. Specifically, _which_ key was pressed.

That's where these lines `if (e.which == 81) {` and `if (e.which == 80) {` come into the picture. `e.which` gives us the **keycode** of whichever key was pressed. You don't need to worry about the specific numbers associated with keycodes, memorizing them would be a total waste of time. All you need to know is that every key on the keyboard has its own integer keycode, and that the keycodes for **"Q"** and **"P"** happen to be **81** and **80** for some reason.

So, by saying `if (e.which == 80) {` we're saying, "IF the key I pressed has the keycode 80, do this thing...". And "this thing", in our situation, is moving the player. We do this with the `movePlayer()` function, but, again, this function doesn't exist yet. So let's write it now.

#### Moving the players


<!-- function movePlayer (playerInt) {
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
  ```  -->
