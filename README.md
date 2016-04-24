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
```
function movePlayer (playerInt) {
  var row = document.getElementById('player' + playerInt + '_strip')
  var cell = document.getElementsByClassName('active' + playerInt)
  var nextCell = row.cells[cell[0].cellIndex + 1]

  cell[0].className = ''
  nextCell.className = 'active' + playerInt
}
```
So, there's a lot of stuff going on here, let's take it line by line.
The first line, `function movePlayer (playerInt) {`, is pretty straight forward. Our function takes one argument, it's an int representing either 'player1' (`movePlayer(1)`), or player2 (`movePlayer(2)`).

#### Assigning the row and cell variables
Now, in order to move our player, we need three things. We need the row they're on, we need the cell they're currently in, and we need the *next* cell, the one they're moving to. That's what these three lines are doing:
```
var row = document.getElementById('player' + playerInt + '_strip')
var cell = document.getElementsByClassName('active' + playerInt)
var nextCell = row.cells[cell[0].cellIndex + 1]
```
First, we declare a new variable called `row`, and we use another `document` function. We're using `getElementById`, which takes a string as an argument, and returns you the element that corresponds to that ID. Let's say we were trying to find the row that player1 is in, in our HTML it looks like this: `<tr id="player1_strip">`. So we could get a reference to it by calling `document.getElementById('player1_strip')`. BUT, we're building a clever function, that can find either player1 **or** player2, depending on our playerInt variable. So we build a clever little string, that generates the correct ID for us. `('player' + playerInt + '_strip')`. This will return either `'player1_strip'` or `'player2_strip'` depending on our `playerInt` variable. This is very good practice, because if we decided to add more players into the game later, we could simply call `movePlayer(3)` or `movePlayer(4815162342)`, and it would still work, so long as that player ID existed in our HTML.

The next line, `var cell = document.getElementsByClassName('active' + playerInt)`, does pretty much exactly the same thing. Except now, we're finding the cell the player is in by it's class, either `active1` or `active2`, and we're using the same *string concatenation* technique. There is one little difference in what we're getting back there though, and it's a wee semantic trick. Note that it's get **Elements** ByClassName (plural) not get **Element** (singular). This is because it's used to find multiple elements with the same class. In this situation, it would be better to use IDs for the player cells too, like we did with the rows. However, it's useful to have experience with both ID *and* Class selection methods, so I decided to leave the classes in there for a bit of extra practice.

#### Assigning the nextCell variable
Now... `var nextCell = row.cells[cell[0].cellIndex + 1]`, is a little complex. I'm going to somewhat dodge the bullet here, and recommend you do some [stack overflow] (http://stackoverflow.com/questions/4968406/javascript-property-access-dot-notation-vs-brackets) reading on using square brackets to access data in arrays. But I'll try break this down as best I can: We are accessing the `cells` inside our  `row` variable, and we're specifying that we want the one *after* our currently active cell.

This is really the tricky part: `cells[cell[0].cellIndex + 1]`. I understand that this will be confusing. It _is_ confusing. It's made even worse by the fact that our `cell` variable, is actually an **array with one cell inside it**, because of that `getElementsByClassName` function we talked about earlier. It is designed to return us an array with all the matching elements inside, but we are selecting only one element. So our cell variable actually looks kinda like this:
`var cell = [td]`. And in order to access that `td`, we need to use square bracket notation. (`cell[0]`).

Finally, we get the position of that cell within the row, by calling it's `.cellIndex` property. This tells us how far the racer is along the track. If the `row` is 8 cells long, and the `cell[0].cellIndex` is **3**, we know we're on the **forth** cell in the row. Because rows are _arrays_ of cells, so they start at 0. Index 3 = Cell 4. This means we can determine the next cell in the row, by calling `cell[0].cellIndex + 1`.

That got a little scary for a moment there, so maybe take a break, drink some water, then come back and read that section again. Nested indexes are a really tricky but important concept to get your head around.  
**Don't feel bad if you don't understand it, only feel bad if you're not trying to understand it.**

#### Setting the classes
Now, the last two lines of our function, thankfully, are much easier to understand.
```
cell[0].className = ''
nextCell.className = 'active' + playerInt
```
First, we set the `className` of our `cell` variable to an empty string. This means that we are no longer in that cell, and it will return back to the LightGrey color we set in our CSS earlier. Then, we give our `nextCell` variable the an active className. We're doing a little bit of *string concatenation* again here. It's going to set the className to be either `active1` or `active2`, depending on which player we're moving. Your index.js file should now look like this:
```
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keyup', handleKeyPress)
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

  cell[0].className = ''
  nextCell.className = 'active' + playerInt
}
```

#### Linking Javascript into our HTML
Only one step left, and then we'll have a (somewhat) working version of our racer game. Back in `index.html`, we'll add a `<script>` tag at the very bottom of our `<head> ... </head>` element:
```
<!-- index.html -->

<head>
  ...
  <script src="index.js"></script>
</head>
```
Now, all going well, you can open up `index.html` in chrome, and be able to move your little racers with the "Q" and "P" keys. Congratulations!
However, don't pat yourself on the back too hard, because there's a fatal problem here... What happens when the racers reach the end of the track? Nothing! And if you open your developer console, you'll see this error getting thrown: `Uncaught TypeError: Cannot set property 'className' of undefined`. This is because now our `nextCell` variable is trying to access a cell that doesn't exist! And what's worse, the game never ends or resets. It just sits there.

So let's turn our first problem, `Cannot set property 'className' of undefined` into the solution. Let's hop back over into `index.js` and add a new function.

#### I wanna win already
```
function checkForVictory (nextCell, playerInt) {
  if (nextCell === undefined) {
    alert('Player ' + playerInt + ' wins!')
    window.location.reload()
  }
}
```
Here we turn a bug into a solution. We write a function that takes two arguments, they are the `nextCell` and `playerInt` variables from our `movePlayer()` function. Inside our `if ()` statement, we check to see if the next cell is `undefined`. If it is, we know the racer is at the end of the track! If it is undefined, we issue a standard Javascript `alert`. If you haven't used an `alert` before, then you're in for a treat. They're super fun and annoying, like popup ads.

Inside the alert, we do a little more string concatenation magic. The alert will read either *'Player 1 wins!'* or *'Player 2 wins!'*, depending on our `playerInt` variable. Then we call `window.location.reload()`. This nifty little function just reloads our browser page. It's a quick and easy reset for our game.

Now, we just need to slip this new function into our `movePlayer` code somewhere. I think right in the middle. After we define our `nextCell` variable, but before we change its class:
```
function movePlayer (playerInt) {
  ...
  var nextCell = row.cells[cell[0].cellIndex + 1]

  checkForVictory(nextCell, playerInt)
  ...
}
```
We pass in our `nextCell` and `playerInt` variables, and now, unless something has wrong terribly awry, you'll have a fully working racing game! Open up `index.html` in chrome and take a look.

### 4. jQuery (optional)
So, we have a working racer app built with plain ol', vanilla Javascript. Let's try spice things up a little though; we can slim down the code and make it easier to add new features by introducing [jQuery](https://api.jquery.com/). I won't get into what jQuery is or it's advantages too much, you can read about that yourself. The bottom line is this: jQuery is a library that helps us interact with HTML and the DOM, and gives us some useful methods that Javascript doesn't have.

#### Setting up jQuery.
There are a couple of different ways you can get jQuery into your project. It can be installed as a dependency using NPM, but for this tutorial we'll just import it as a `<script>` in our HTML. Add the following line into your `<head> ... </head>` tag.
```
<!-- index.html -->

<head>
  ...
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <script src="index.js"></script>
</head>
```
It sits just above the `index.js` tag. We need to make sure that it has been successfully loaded in before we try to use it in our own scripts.

#### Replacing our vanilla Javascript with jQuery functions
Head over to `index.js`, and replace the first section:
```
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keyup', handleKeyPress)
})
```
With the updated jQuery syntax:
```
$(document).ready(function () {
  $(document).keyup(handleKeyPress)
})
```
For the most part, you know you're looking at a jQuery method when you see **$** in front of a pair of brackets. This isn't always the case, because other libraries sometimes use dollar signs too. But when you're doing web development in Javascript, it's a fairly safe bet.

There are a few things worth noting here. First, it's much shorter! Shorter is almost always better, and it's much less verbose. `addEventListener('DOMContentLoaded'` turns into simply, `.ready`. And the same for `.keyup`. jQuery's methods are very concise.

Now, let's update our functions for jQuery. We don't need to update our `handleKeyPress` function. jQuery can't really help us there. But it probably could improve `movePlayer()`. Replace the `movePlayer()` function with the following:
```
function movePlayer (playerInt) {
  var cell = $('.active' + playerInt)
  var nextCell = $(cell).next()

  checkForVictory(nextCell, playerInt)

  cell.removeClass()
  nextCell.addClass('active' + playerInt)
}
```
Here, thanks to jQuery, we don't even *need* a reference to our table row anymore, so we can do away with that line entirely. The syntax for selecting the HTML elements is different, too. Instead of the cumbersome `var cell = document.getElementsByClassName('active' + playerInt)`, we can now simply put `var cell = $('.active' + playerInt)`. I'll let you dive into the specifics of jQuery selection methods yourself, in that article I referenced [earlier](https://api.jquery.com/). For the most part, you just need to remember that `$(.)` is used to select classes, and `$(#)` is used to select IDs.

It gets really powerful when you combine selector methods together. That really complicated line from before: `var nextCell = row.cells[cell[0].cellIndex + 1]` is replaced by the *significantly* more gleanable: `var nextCell = $(cell).next()`.

Finally, we remove the active class from our current cell, and add it to the next cell. It also looks way nicer using jQuery:
```
cell.removeClass()
nextCell.addClass('active' + playerInt)
```

Finally, we need to update our `checkForVictory()` function.
This one, weirdly, actually gets a little harder to understand with jQuery.
Replace `checkForVictory()`:
```
function checkForVictory (nextCell, playerInt) {
   if (!$(nextCell).is('td')) {
    alert('Player ' + playerInt + ' wins!')
    window.location.reload()
  }
}
```
