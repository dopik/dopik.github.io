document.addEventListener('DOMContentLoaded', init)
	
function init() {
	document.getElementById('roll').addEventListener('click', roll);
}

function roll() {
	var dice = Number(document.getElementById('dice').value)
	var number = Number(document.getElementById('number').value)
	var output = document.getElementById('output')
	
	var sum = 0
	var string = ''
	var rnd
	
	if (number == 1) {
		output.value = Math.floor(Math.random() * dice) + 1
		return
	}
	
	for (var i = 0; i < number; i++) {
		rnd = Math.floor(Math.random() * dice) + 1
		
		sum += rnd
		string += rnd + ' + '
	}
	
	string = string.replace(/\s\+\s$/, ' = ')
	string += sum
	
	output.value = string
}