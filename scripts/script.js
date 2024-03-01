/*script.js*/
let score = 0
let i = 0
let listeChoisie = listeMots;

function afficherResultat (resultat, nombreTotalMots) {
    let spanScore = document.querySelector(".zoneScore span")
    let afficherScore = `${resultat} / ${nombreTotalMots}`
    spanScore.innerText = afficherScore
    console.log(spanScore)
}

function afficherProposition (proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

function validerNom(nom) {
    if(nom.length < 2) {
        throw new Error("Le nom est trop court. ")
    } 
}

function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide.")
    }
}

function afficherMessageErreur(message) {
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        
        popup.append(spanErreurMessage)
    }
    
    spanErreurMessage.innerText = message
}

function gererFormulaire(scoreEmail) {
    try{
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
    
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value

        validerNom(nom)
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)
    } catch (error) {
        afficherMessageErreur(error.message)
    }
}

function lancerJeu () {
    initAddEventListenerPopup()
    let baliseChoix = document.querySelectorAll('input[name="optionSource"]')
    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")
    
    baliseChoix.forEach(function(element) {
        element.addEventListener("change", function() {
            if (element.checked) {
                // Mise à jour de la liste choisie en fonction de l'option sélectionnée
                if (element.value === "2") {
                    listeChoisie = listePhrases;
                } else {
                    listeChoisie = listeMots;
                }
                // Afficher la première proposition de la nouvelle liste choisie
                afficherProposition(listeChoisie[i]);
            }
        });
    });

    
    inputEcriture.addEventListener("input", function () {
        console.log(inputEcriture.value)
    })
    btnValiderMot.addEventListener("click", function () {
        console.log("j'ai cliqué")
        if (inputEcriture.value === listeChoisie[i]) {
            score++
        }
        console.log(score)
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeChoisie[i] === undefined) {
            afficherProposition("Le jeu est fini")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listeChoisie[i])
        }
    })
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()

        let scoreEmail = `${score} / ${i}`
        gererFormulaire(scoreEmail)
    })
}
