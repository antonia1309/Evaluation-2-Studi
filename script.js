/*
- click sur roll dice pour lancer le dé
- click sur hold permet d'envoyer les points du round=curent au global et 
passe  la main à l'autre joueur
- click sur new game: initialisation à 0
- round=current: score temporaire remis à 0
- global: score général
- si le dé = 1, score round perdu et fin du tour
- gain à 100 points
*/

//Déclaration des variables et remise à 0
let gamePlaying, roundScore, activePlayer, scorePlayer;
gamePlaying = true;
roundScore = 0;
activePlayer = 0;// indicateur du joueur actif: 0 premier joueur et 1 deuxième joueur
scorePlayer = [0,0];


//Masquer l'image du dé
document.querySelector('.img-dice').display = "none";

//Initialiser les scores à 0 au début du jeu 
function resetScores(){
  document.getElementById('score-0').textContent =0;
  document.getElementById('current-0').textContent =0;
  document.getElementById('score-1').textContent =0;
  document.getElementById('current-1').textContent =0;
}

/*************BOUTON ROLL DICE  ****************/
//fonction Math random et affichage du Dé
document.querySelector('.btn-roll-dice').addEventListener('click', function(){
  if(gamePlaying){
    let dice = Math.floor(Math.random()*6+ 1);
    let diceRandom = document.querySelector('img-dice');
    diceRandom.style.display = 'block';
    diceRandom.src = 'IMG/dice-'+ dice +'.png';
    
    /*Si le dé est différent de 1, le joueur continue de jouer. 
    On ajoute le résultat du dé au score global du joueur.*/
    /*Si le dé est égal à 1, le joueur actif perd son score temporaire (on le remet à zéro) et le tour passe au joueur suivant en utilisant la fonction nextPlayer().*/
    
    if (dice !== 1){
      roundScore += dice;
      document.getElementById('current-'+activePlayer).textContent = roundScore;
    }
    else{
      changePlayer();
    }
  }
});

/*************BOUTON HOLD  ****************/
//fonction  qui permet d'ajoutée la valeur du score temporaire au score total du joueur et passe son tour à l'autre joueur.
document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    scorePlayer[activePlayer] += roundScore;
    //Mise à jour du score du joueur actif.
    document.getElementById('score-'+activePlayer).textContent = scorePlayer[activePlayer];
    if(scorePlayer[activePlayer] >= 10){
      //Variables gagnant ou perdant
      const winnerIndex = activePlayer;
      //Si activePlayer n'est pas === 0, joueur 2 gagne et joueur 1 perd
      const loserIndex = activePlayer === 0 ? 1 : 0;
      
      //Affiche le gagnant
      const winnerName = document.getElementById('player-' + winnerIndex);
      winnerName.textContent = playerNames[winnerIndex] + " WINNER";
      winnerName.style.color = '#3CB371';

      //Affiche le nom du joueur perdant
      const loserName = document.getElementById('player-' + loserIndex);
      loserName.textContent = playerNames[loserIndex] + " FAILED";
      loserName.style.color = '#EB4D4C';

      document.querySelector('.img-dice').style.display ='none';
      //Ajout d'une classe winner du joueur gagnant
      document.querySelector('.playerContainer-'+activePlayer+'-panel').classList.add('winner');
      //Retrait de la classe active du joueur gagnant
      document.querySelector('.playerContainer-'+activePlayer+'-panel').classList.remove('active');
      //Le jeu est terminé quand le joueur atteint le score final
      gamePlaying = false;
    }else{
      changePlayer();
    }

  }
});


/*La fonction changePlayer() permet de passer au joueur suivant. Si activePlayer est égal à 0, on le met à 1, sinon on le remet à 0.*/
function changePlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  //Désactive ou active l'apparence des joueurs qui jouent
  document.querySelector('.playerContainer-0-panel').classList.toggle('active');
  document.querySelector('.playerContainer-1-panel').classList.toggle('active');
  //.toggle permet d ajouter la classe active s'il n y en a pas
}
