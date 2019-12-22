// terrible code

document.addEventListener('DOMContentLoaded', init)
	
var anzahl = 2;
var row

function init() {
	document.getElementById('addPlayer').addEventListener('click', addPlayer);
	document.getElementById('startGame').addEventListener('click', startGame);
}

function addPlayer() { 
	anzahl++
	var button = document.getElementById('addPlayer')
	var players = document.getElementById('names')
	
	var newData = document.createElement('th')
	var newPlayer = document.createElement('input')
	newPlayer.placeholder = 'Spieler ' + anzahl
	newPlayer.className = 'name'
	newPlayer.id = 'name' + (anzahl - 1)
	
	var fragment = document.createDocumentFragment()
	newData.appendChild(newPlayer)
	fragment.appendChild(newData)
	fragment.appendChild(button)
	
	players.appendChild(fragment)
	newPlayer.focus()
	if (anzahl > 7) {
		button.innnerHTML = 'Max Spieler'
		button.disabled = true
	}
}

function clearScore() {
	row = 0
	
	var scores = document.getElementById('scoreArea')
	scores.innerHTML = ''
	
	addScoreRow()
	
	scores = document.getElementById('scoreSum')
	scores.innerHTML = ''
	var scoreRow = document.createElement('tr')
	var valOuter
	var valInner
	for (var i = 0; i < anzahl; i++) {
		valOuter = document.createElement('td')
		valInner = document.createElement('input')
		valInner.id = 'sum' + i
		valInner.className = 'sum'
		valInner.disabled = true
		
		valOuter.appendChild(valInner)
		scoreRow.appendChild(valOuter)
	}
	
	scores.appendChild(scoreRow)
	updateSum()
}

function addScoreRow() {
	var scores = document.getElementById('scoreArea')
	var scoreRow = document.createElement('tr')
	var valOuter
	var valInner
	for (var i = 0; i < anzahl; i++) {
		valOuter = document.createElement('td')
		valInner = document.createElement('input')
		valInner.className = 'score' + i + ' row' + row
		valInner.addEventListener('blur', rowFull)
		
		valOuter.appendChild(valInner)
		scoreRow.appendChild(valOuter)
	}
	
	scores.appendChild(scoreRow)
	scoreRow.firstChild.firstChild.focus()
	row++
	
	var scores = document.getElementsByClassName('row' + (row-2))

	for (var i = 0; i < scores.length; i++) {
		scores[i].disabled = true
	}
}

function rowFull() {
	updateSum()
	var rowList = document.getElementsByClassName('row' + (row - 1))
	for (var i = 0; i < anzahl; i++) {
		if (rowList[i].value == '')
			return
		//rowList[i].removeEventListener('blur', rowFull)
	}
	addScoreRow()
}

function updateSum() {
	var sum
	var scores
	var won

	for (var i = 0; i < anzahl; i++) {
		sum = 0
		scores = document.getElementsByClassName('score' + i)
		for (var k = 0; k < scores.length; k++) {
			sum += Number(scores[k].value)
		}
		document.getElementById('sum' + i).value = sum
	}
}

function startGame() {
	var buttonStart = document.getElementById('startGame')
	buttonStart.innerHTML = 'Next Game'
	
	var buttonAdd = document.getElementById('addPlayer')
	buttonAdd.parentNode.removeChild(buttonAdd)
	buttonAdd = document.getElementById('addPlayerField')
	buttonAdd.parentNode.removeChild(buttonAdd)
	
	var players = document.getElementsByClassName('name')

	for (var i = 0; i < players.length; i++) {
		players[i].disabled = true
	}
	
	clearScore()
	
	document.getElementById('startGame').addEventListener('click', nextGame);
}

function nextGame() {
	var players = document.getElementById('names')
	players.appendChild(players.children[0])
	
	clearScore()
}