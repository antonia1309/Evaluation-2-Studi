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
let gamePlaying, roundScore, activePlayer;
gamePlaying = true;
roundScore = 0;
activePlayer = 0;


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
document.querySelector('.btn-roll-dice').addEventListener(
  click', function(){
  if(gamePlaying){
    let dice = Math.floor(Math.random()*6+ 1);
    let diceRandom = document.querySelector('img-dice');
    diceRandom.style.display = 'block';
    diceRandom.src = 'IMG/dice-'+ dice +'.png';
    
    /*Si le dé est différent de 1, le joueur continue de jouer. 
    On ajoute le résultat du dé au score global du joueur.*/
    
    if (dice !== 1){
      document.getElementById('current-'+activePlayer).textContent = roundScore;
      roundScore += dice;
    }
    else{
      changePlayer();
    }
  }
});

/*Si le dé est égal à 1, le joueur actif perd son score temporaire (on le remet à zéro) et le tour passe au joueur suivant en utilisant la fonction nextPlayer(). 
La fonction changePlayer() permet de passer au joueur suivant. Si activePlayer est égal à 0, on le met à 1, sinon on le remet à 0.*/
function changePlayer(){

}
