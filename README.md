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
Now... `var nextCell = row.cells[cell[0].cellIndex + 1]`, is a little complex. I'm going to dodge the bullet here, and recommend you do some [stack overflow] (http://stackoverflow.com/questions/4968406/javascript-property-access-dot-notation-vs-brackets) reading on using square brackets to access data in arrays. But I'll try break this down as best I can: We are accessing the `cells` inside our  `row` variable, and we're specifying that we want the one *after* our currently active cell. (Hence the `+ 1`).

This is really the tricky part: `cells[cell[0].cellIndex + 1]`. I understand that this will be confusing. It _is_ confusing. It's made even worse by the fact that our `cell` variable, is actually an **array with one cell inside it**, because of that `getElementsByClassName` function we talked about earlier. It is designed to return us an array with all the matching elements inside, but we are selecting only one element. So our cell variable actually looks kinda like this:
`var cell = [td]`. And in order to access that `td`, we need to use square bracket notation. (`cell[0]`).

Finally, we get the position of that cell within the row, by calling it's `.cellIndex` property. This tells us how far the racer is along the track. If the `row` is 8 cells long, and the `cell[0].cellIndex` is **3**, we know we're on the *forth* cell in the row. Because rows are _arrays_ of cells remember, so they start at 0. Index 3 = Cell 4. This means we can determine the next cell in the row, by calling `cell[0].cellIndex + 1`.

That got a little scary for a moment there, so maybe take a break, drink some water, then come back and read that section again. Nested indexes are a really tricky but important concept to get your head around.  
**Don't feel bad if you don't understand it, only feel bad if you're not attempting to understand it.**

#### Setting the classes

checkForVictory(nextCell, playerInt)

function checkForVictory (nextCell, playerInt) {
  if (nextCell === undefined) {
    alert('Player ' + playerInt + ' wins!')
    window.location.reload()
  }
}
