console.log("highscores entered");


function displayHighscores() {
    console.log('displayHighScores');
    var highscores = JSON.parse(localStorage.getItem('scores'));

    highscores.sort(function(a, b) {
        // if positive returns, then swtich positions
        // if zero or nagative, then positions remain
        return b.score - a.score;
    });

    for (var i = 0; i < highscores.length; i++ ) {
        var liEl = document.createElement('li');
        liEl.textContent = highscores[i].score + " - " + highscores[i].initials;

        document.getElementById('highscores').appendChild(liEl);
    }
}

displayHighscores();

// Set up an event listener to clear the scores in localStorage.
// Check localStorage method on how to remove an item from localStorage

