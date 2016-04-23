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
