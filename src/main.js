import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DinoService } from './apicall.js';
import { Game } from './game.js';

$(document).ready(function(){
  let newGame;

  $("#startButton").click(function(){
    (async () => {
      let dinoService = new DinoService();
      const response = await dinoService.getDinoWord();
      getElements(response);
    })();

    function getElements(response) {
      let dinoWord = response.toString();
      console.log(dinoWord);
      newGame = new Game(dinoWord);
      newGame.makeArrays();
      $('#wordDump').text(newGame.getArray());
      $("#startButton").hide();
      $("#game").show();
      $('#guessesLeft').text(newGame.triesLeft+1);
    }
  });

  $(".guesses").submit(function(event){
    event.preventDefault();
    let guess = $("#letterInput").val();
    if (newGame.loseCheck()){
      $('#wordDump').text(newGame.dinoWord);
      console.log("You lose");
    }
    else if (newGame.winCheck()){
      $('#wordDump').text(newGame.dinoWord);
      console.log("You win!");
    }
    else {
      newGame.checkLetter(guess);
      $('#wordDump').text(newGame.getArray());
      $('#letterDump').text(newGame.getUsedLetters());
      $('#guessesLeft').text(newGame.triesLeft+1);
    }
  });

});