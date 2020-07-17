//javascript.js
var playing = false;  // quand on recharge notre page la variable est d’abord false
var score;
var timeremaining; // on declare une variable pour le temps restant, au départ la variable n’a pas d valeur
//Declarons une variable pour la multiplication
var correctAnswer;


//si on clique sur le démarrer / réinitialiser
document.getElementById("startreset").onclick = function(){

    
    //si on joue
    
    if(playing == true){
        
        location.reload(); //recharger la page
        
    }else{//si on ne joue pas
        
        //changer de mode pour jouer
        
        playing = true;
        
        //mettre le score à 0
        
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
     
        //afficher le compte à rebours
        
      
    
       // document.getElementById("timeremaining").style.display = "block";
		 show("timeremaining");
		
		timeremaining = 60; // on donne au départ 60 seconde
        //on recupere la valeur (timeremainingvalue) du temps restant qui est dans le fichier //index, on affecte à la nouvelle valeur du timeremaining

        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

  
        //cacher le jeu sur la boîte
          //cacher le jeu sur la boîte
        
        hide("gameOver");
         
		// document.getElementById("gameOver").style.display = "none";
  
        
        //changer le bouton pour réinitialiser
        document.getElementById("startreset").innerHTML = "Réinitialiser le jeux";
        
        //commencer le compte à rebours Commencer le compte à rebours, on va définir une fonction pour
         startCountdown();
		 
			
        //générer une nouvelle Question & Reponse, ajoute le 8 janvier
        
        generateQA();
		
        
    
    }
    
}

//Si on clique sur une boîte de réponse, ajoute le 8 janvier

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //vérifier si on joue    
    if(playing == true){//oui
        if(this.innerHTML == correctAnswer){
        //bonne réponse
            
            //augmenter le score de 1
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            //cacher la mauvaise boîte et afficher la boîte correcte
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);
            
            //générer une nouvelle Question & Reponse
            
            generateQA();
        }else{
        //mauvaise réponse
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
            }, 1000);
        }
    }
}   
}
function startCountdown(){
    action = setInterval(function(){
		//réduire le temps d'une seconde
        timeremaining -= 1;
//on recupere la valeur (timeremainingvalue) du temps restant qui est dans le fichier //index, on affecte à la nouvelle valeur du timeremaining

        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
		// Vérifions combien de temps reste
		if(timeremaining == 0){// jeu terminé
		// si le jeu est terminé, on arrete, on appelle une fonction pour arreter
		stopCountdown();
		
		// document.getElementById("gameOver").style.display = "block"; ajouter le 8 janvier
		 show("gameOver");
         document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Votre score est " + score + ".</p>";
		//On veut egalement que notre la boite du temps restant disparait en meme, on va utiliser la propriete display et le mettre à none
       // document.getElementById("timeremaining").style.display = "none";
		
		   hide("timeremaining");
           hide("correct");
					//On cache egalement le reponse correct
        // document.getElementById("correct").style.display = "none";
		
		// On cache le reponse fausse
      // document.getElementById("faux").style.display = "none"; 
            hide("faux");
		
		

		
	   //afficher button jeu terminé, changer le button pour redemarrer le jeu
        document.getElementById("startreset").innerHTML = "Démarrer le jeux";

		}

	
    }, 1000);    
}

//stop compteur, 
function stopCountdown(){
// stoppe le décompte par un appel à clearInterval qui prend comme parametre action.
    clearInterval(action);   
}

//cacher un élément

function hide(Id){
    document.getElementById(Id).style.display = "none";   
}

//Afficher un element

function show(Id){
    document.getElementById(Id).style.display = "block";   
}

//Générer des questions et des réponses multiples

function generateQA(){
	//Nous voulons obtenir  entre un nombre entre 1 et 9
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
	//Declarons une variable pour la multiplication
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //Remplissez une boite avec la bonne réponse
    
    //Remplissez les autres boites avec de mauvaises réponses
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}


