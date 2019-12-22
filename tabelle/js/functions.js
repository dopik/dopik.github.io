// terrible code

document.addEventListener('DOMContentLoaded', init)
	
var anzahl = 2
var won = false

function init() {
	document.getElementById('addPlayer').addEventListener('click', addPlayer);
	document.getElementById('startGame').addEventListener('click', startGame);
}

function addPlayer() { 
	anzahl++
	
	var button = document.getElementById('addPlayer')
	var board = document.getElementById('scoreboardColums')
	
	var newTD = document.createElement('td')
	var newDiv = document.createElement('div')
	var newInput = document.createElement('input')

	newDiv.id = 'player' + anzahl
	newDiv.className = 'player'
	
	newInput.placeholder = 'Spieler ' + anzahl
	newInput.id = 'name' + anzahl
	newInput.className = 'name'
	newInput.size = '8'
	
	newDiv.appendChild(newInput)
	newTD.appendChild(newDiv)
	board.appendChild(newTD)
	board.appendChild(button.parentNode.parentNode)
	
	if (anzahl > 7) {
		button.disabled = true
		button.innerHTML = 'Max Spieler'
	}
}

function clearScore() {	
	var scores = document.getElementsByClassName('scoreRemove')

	while (scores[0]) {
		scores[0].remove() //scores[i].parentNode.removeChild(scores[i])
	}

	var players = document.getElementsByClassName('player')
	var newInput
	for (var i = 0; i < anzahl; i++) {
		newInput = document.createElement('input')
		newInput.disabled = true
		newInput.className = 'sum scoreRemove'
		newInput.size = 5

		players[i].appendChild(newInput)
	}

	addScoreRow()
	updateSum()
}

function addScoreRow() {
	if (won)
		return
	
	var players = document.getElementsByClassName('player')
	var newInput
	var sum
	for (i = 0; i < anzahl; i++) {
		sum = players[i].lastChild
		
		sum.previousSibling.disabled = true
		
		newInput = document.createElement('input')
		newInput.className = 'score scoreRemove'
		newInput.size = 5
		newInput.addEventListener('blur', rowFull)
		
		players[i].appendChild(newInput)
		players[i].appendChild(sum)
	}
	
	var columns = document.getElementById('scoreboardColums')
	columns.firstElementChild.firstElementChild.lastElementChild.previousElementSibling.focus()
}

function rowFull() {
	updateSum()
	var sums = document.getElementsByClassName('sum')
	for (var i = 0; i < anzahl; i++) {
		if (sums[i].previousElementSibling.value == '')
			return
	}
	addScoreRow()
}

function updateSum() {
	var sum, score
	var players = document.getElementsByClassName('player')

	for (var i = 0; i < anzahl; i++) {
		sum = 0
		score = players[i].firstElementChild.nextElementSibling
		while (score.nextElementSibling) {
			sum += Number(score.value)
			score = score.nextElementSibling
		}
		score.value = sum
		
		if (sum > 10000)
			checkWin()
	}
	
	checkChoke()
}

function checkWin() {
	won = true
	
	var scores = document.getElementsByClassName('sum')
	var min,max = MAX_VALUE, MIN_VALUE
	
	for (var i = 0; i < anzahl; i++) {
		min = Math.min(min, Number(scores[i].value))
		max = Math.max(max, Number(scores[i].value))
	}
	
	for (var i = 0; i < anzahl; i++) {
		switch(Number(scores[i].value)) {
			case min:
				scores[i].classList.add('winner')
				break;
			case max:
				scores[i].classList.add('loser')
				break;
		}
	}
}

function checkChoke() {
	var counter, score
	var players = document.getElementsByClassName('player')

	for (var i = 0; i < anzahl; i++) {
		counter = 0
		score = players[i].firstElementChild.nextElementSibling
		while (score.nextElementSibling) {
			if (score.value == '0') {
				counter++
			} else {
				counter = 0
			}
			
			switch (counter) {
				case 2:
					score.classList.add('chokeWarn')
					score.previousElementSibling.classList.add('chokeWarn')
					break;
				case 3:
					counter = 0
					score.classList.add('choke')
					score.previousElementSibling.classList.add('choke')
					score.previousElementSibling.previousElementSibling.classList.add('choke')
					break;
			}
			
			score = score.nextElementSibling
		}
	}
}

function startGame() {
	var buttonStart = document.getElementById('startGame')
	buttonStart.innerHTML = 'Next Game'
	buttonStart.removeEventListener('click', startGame)
	buttonStart.addEventListener('click', nextGame)
	
	var buttonAdd = document.getElementById('addPlayer')
	var buttonAddParent = buttonAdd.parentNode
	var buttanAddGrandParent = buttonAddParent.parentNode
	
	buttonAdd.remove()
	buttonAddParent.remove()
	buttanAddGrandParent.remove()
	
	clearScore()
}

function nextGame() {
	won = false
	
	var boardColums = document.getElementById('scoreboardColums')
	boardColums.appendChild(boardColums.firstElementChild)
	
	clearScore()
}