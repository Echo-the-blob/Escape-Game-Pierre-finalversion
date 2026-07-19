const MODE_DEV = true;

// ==========================
// INITIALISATION DE MISSION
// ==========================


const boutonMission = document.getElementById("start");

const accueil = document.getElementById("accueil");

const mission = document.getElementById("mission");



// Quand Pierre accepte la mission

boutonMission.addEventListener("click", function(){


    accueil.style.display = "none";

    mission.classList.add("cache");


    const chargement = document.createElement("div");

    chargement.className = "chargement";

    chargement.style.position = "fixed";
    chargement.style.top = "50%";
    chargement.style.left = "50%";
    chargement.style.transform = "translate(-50%, -50%)";
    chargement.style.zIndex = "99999";


    chargement.innerHTML = `

        <p>INITIALISATION DU PROTOCOLE...</p>

        <p>VÉRIFICATION DU DESTINATAIRE...</p>

        <p>ACCÈS AU DOSSIER PG-001...</p>

    `;


    document.body.appendChild(chargement);



    setTimeout(function(){


        chargement.remove();


        mission.classList.remove("cache");


    }, 3500);



});

// ==========================
// PREMIER FICHIER CLASSIFIÉ
// ==========================


const boutonAnalyse = document.getElementById("ouvrir-enigme");

boutonAnalyse.addEventListener("click", lancerAnalyse);


function lancerAnalyse(){

    const bouton = document.getElementById("ouvrir-enigme");

    bouton.disabled = true;
    bouton.innerText = "ANALYSE EN COURS...";

    const ecran = document.createElement("div");

    ecran.className = "analyse";

    ecran.innerHTML = `

        <p>Connexion au serveur...</p>

        <div class="barre-analyse">
            <div id="progression-analyse"></div>
        </div>

        <p id="etat-analyse">
            Initialisation...
        </p>

    `;

    document.body.appendChild(ecran);

    const barre = document.getElementById("progression-analyse");

    const texte = document.getElementById("etat-analyse");

    let largeur = 0;

    const interval = setInterval(function(){

        largeur++;

        barre.style.width = largeur + "%";

        if(largeur == 25){
            texte.innerText = "Déchiffrement AES-256...";
        }

        if(largeur == 50){
            texte.innerText = "Vérification biométrique...";
        }

        if(largeur == 75){
            texte.innerText = "Ouverture du fichier...";
        }

        if(largeur >= 100){

            clearInterval(interval);

            ecran.remove();

            bouton.disabled = false;

            bouton.innerText = "LANCER L'ANALYSE";

            ouvrirEnigme();

        }

    },35);

}

function ouvrirEnigme(){

    document.getElementById("enigme").classList.remove("cache");

}
// ==========================
// VALIDATION ENIGME 001
// ==========================

const boutonValidation = document.getElementById("validerReponse");

boutonValidation.addEventListener("click", verifierReponse);

// ==========================
// BASE DES FICHIERS CLASSIFIÉS
// ==========================

const fichiers = [

    {
        numero:"PG-001",
        code:"3110",
        question:"Le jour où tout a commencé pour toi.",
        indice:"Date en JJMM",
        photo:"1.jpg"
    },

    {
        numero:"PG-002",
        code:"090104",
        question:"Il était une fois Chloé.",
        indice:"Date en JJMMYY",
        photo:"2.jpg"
    },

    {
        numero:"PG-003",
        code:"wingardiumleviosa",
        question:"Un sortilège que je maîtrise sans jamais avoir mis les pieds à Poudlard.",
        indice:"Un mot, 17 lettres",
        photo:"3.jpg"
    },

    {
        numero:"PG-004",
        code:"Vazy",
        question:"Suzy = ...",
        indice:"Ma crapule",
        photo:"4.jpg"
    },

    {
        numero:"PG-005",
        code:"Fallout",
        question:"Une série atomique.",
        indice:"Bientôt on fera des transactions grâce aux sodas.",
        photo:"5.jpg"
    },

    {
        numero:"PG-006",
        code:"aquarium",
        question:"méduses ... ?",
        indice:"Tu y es également retourné avec une classe.",
        photo:"6.jpg"
    },

    {
        numero:"PG-007",
        code:"marché",
        question:"Lieu où j'ai rencontré tes parents pour la première fois.",
        indice:"Easy",
        photo:"7.jpg"
    },

    {
        numero:"PG-008",
        code:"japonais",
        question:"Notre premier restaurant ensemble.",
        indice:"Également notre dernier restaurant.",
        photo:"8.jpg"
    },

    {
        numero:"PG-009",
        code:"WarHammer",
        question:"Ton hobby.",
        indice:"Sois puriste et mets les majuscules.",
        photo:"9.jpg"
    },

    {
        numero:"PG-010",
        code:"mes fesses",
        question:"T'aimes bien mettre des claques dessus.",
        indice:"Au pluriel.",
        photo:"10.jpg"
    }

];



// ==========================
// CHARGEMENT DU FICHIER ACTUEL
// ==========================

function chargerFichier(){

    const fichier = fichiers[fichierActuel];


    document.querySelector("#fichier-actuel .classification").innerText =
    "FICHIER CLASSIFIÉ " + String(fichierActuel + 1).padStart(3,"0");


    document.getElementById("question").innerText =
    fichier.question;


    document.getElementById("titre-enigme").innerText =
    "DOSSIER " + fichier.numero;


    const indice = document.getElementById("indice");

    indice.innerText =
    "INDICE : " + fichier.indice;

    indice.classList.add("cache");


    // nettoyage de l'ancienne réponse
    document.getElementById("reponse").value = "";


    // nettoyage du message précédent
    document.getElementById("messageReponse").innerText = "";


}

// ==========================
// OUVERTURE PHOTO
// ==========================

function ouvrirPhoto(photo){


    document.getElementById("enigme")
    .classList.add("cache");


    const photoSection = document.getElementById("photo-section");

    photoSection.classList.remove("cache");


    document.getElementById("photo").src = "Photos/" + photo;


    document.getElementById("message-photo").innerText =
    "FICHIER " + fichiers[fichierActuel].numero + " DÉCLASSIFIÉ";


}

// ==========================
// PROGRESSION MISSION
// ==========================


let fichierActuel = 
Number(localStorage.getItem("fichierDebloque")) || 0;

function verifierReponse(){

    const reponse = document
    .getElementById("reponse")
    .value
    .trim()
    .toLowerCase();


    const resultat = document.getElementById("messageReponse");


    const fichier = fichiers[fichierActuel];

    console.log("fichierActuel =", fichierActuel);
    console.log("fichier =", fichier);

    
    


    if(reponse === fichier.code.toLowerCase()){


    resultat.innerText = "🔓 ACCÈS AUTORISÉ";

    

    setTimeout(function(){

        ouvrirPhoto(fichier.photo);


    },1500);


}


    else{


        resultat.innerText = "❌ ACCÈS REFUSÉ";


    }

}

// ==========================
// SYSTEME D'INDICE
// ==========================


const boutonIndice = document.getElementById("boutonIndice");


if(boutonIndice){

    boutonIndice.addEventListener("click", function(){


        const indice = document.getElementById("indice");


        const fichier = fichiers[fichierActuel];


        indice.innerText =
        "INDICE : " + fichier.indice;


        indice.classList.remove("cache");


    });

}

// ================================
// TERMINAL ADMINISTRATEUR
// ================================

const terminal = document.getElementById("terminal-admin");

const passwordInput = document.getElementById("admin-password");

const boutonConnexion = document.getElementById("connexion-admin");

const messageAdmin = document.getElementById("admin-message");

const adminPanel = document.getElementById("admin-panel");


// ----------
// Ctrl + Shift + D
// ----------

document.addEventListener("keydown", function(e){

    if(e.ctrlKey && e.shiftKey && e.key.toLowerCase()=="d"){

        terminal.classList.remove("cache");

        passwordInput.focus();

    }

});


// ----------
// Vérification du mot de passe
// ----------

boutonConnexion.addEventListener("click", function(){

    if(passwordInput.value==="0143"){

        messageAdmin.style.color="#5cff6b";

        messageAdmin.innerHTML="✔ ACCÈS AUTORISÉ";

        adminPanel.classList.remove("cache");

        passwordInput.style.display="none";

        boutonConnexion.style.display="none";

        document.querySelector(".terminal label").style.display="none";

    }

    else{

        messageAdmin.style.color="#ff4444";

        messageAdmin.innerHTML="✖ MOT DE PASSE INCORRECT";

    }

});

document
.getElementById("closeTerminal")
.addEventListener("click",function(){

    terminal.classList.add("cache");

});

// ==========================
// PASSAGE FICHIER SUIVANT
// ==========================

const boutonContinuer = document.getElementById("continuer");


boutonContinuer.addEventListener("click", function(){


    document.getElementById("photo-section")
    .classList.add("cache");


    fichierActuel++;

    localStorage.setItem(
    "fichierDebloque",
    fichierActuel
);

    if(fichierActuel >= fichiers.length){
        localStorage.setItem(
            "galerieDebloquee",
            "true"
        );

    document.getElementById("photo-section")
    .classList.add("cache");

    document.getElementById("mission")
    .classList.add("cache");

    document.getElementById("mission-terminee")
    .classList.remove("cache");

    return;

}

    document.getElementById("indice")
    .classList.add("cache");


    document.getElementById("indice").innerText = "";


    chargerFichier();


    document.getElementById("progression").innerText =
    "Fichiers déclassifiés : " + fichierActuel + " / 10";


    document.getElementById("ouvrir-enigme")
    .style.display = "block";


    document.getElementById("mission")
    .classList.remove("cache");


    document.getElementById("enigme")
    .classList.remove("cache");


});

// ==========================
// RESTAURATION PROGRESSION
// ==========================

window.addEventListener("load", function(){

    if(fichierActuel > 0){

        document
        .getElementById("accueil")
        .classList.add("cache");


        document
        .getElementById("mission")
        .classList.remove("cache");


        document
        .getElementById("progression")
        .innerText =
        "Fichiers déclassifiés : "
        + fichierActuel
        + " / 10";


        chargerFichier();

    }

});

// ==========================
// GALERIE PRIVEE
// ==========================


const boutonGalerie =
document.getElementById("ouvrir-galerie");

if(boutonGalerie){

    boutonGalerie.addEventListener("click", function(){

        const code =
        document.getElementById("code-galerie")
        .value
        .trim()
        .toLowerCase();

        const message =
        document.getElementById("message-galerie");

        if(code === "dame chloé"){

            message.innerHTML = `
        🔓 IDENTITÉ CONFIRMÉE

        <br><br>

        Bienvenue Agent Pierre.
        `;

        const chargement =
document.getElementById("chargement-galerie");

const texte =
document.getElementById("texte-chargement");

const barre =
document.getElementById("progression-galerie");

const pourcentage =
document.getElementById("pourcentage-galerie");


chargement.classList.remove("cache");


let messages = [

    "Vérification de l'identité...",
    "Connexion aux archives personnelles...",
    "Analyse des fichiers confidentiels...",
    "Restauration des souvenirs...",
    "Accès aux archives autorisé."

];


let progression = 0;

let index = 0;


const interval = setInterval(function(){


    progression += 2;


    barre.style.width =
    progression + "%";


    pourcentage.innerText =
    progression + "%";


    if(progression % 20 === 0){

        texte.innerText =
        messages[index];

        index++;

    }


    if(progression >= 100){


        clearInterval(interval);


        setTimeout(function(){


            document
            .getElementById("auth-galerie")
            .classList.add("cache");


            document
            .getElementById("galerie-section")
            .classList.remove("cache");


        },1000);


    }


},60);
        setTimeout(function(){

            document
            .getElementById("auth-galerie")
            .classList.add("cache");


            document
            .getElementById("galerie-section")
            .classList.remove("cache");


        },2000);
    }

    else{

        message.innerText =
        "❌ IDENTITÉ NON RECONNUE";

                        
    }

});

console.log(document.getElementById("acceder-galerie"));

const boutonArchives =
document.getElementById("acceder-galerie");


if(boutonArchives){

    boutonArchives.addEventListener("click", function(){

        window.location.href = "galerie.html";

    });

}

// ==========================
// VISIONNEUSE PHOTO
// ==========================

const miniatures =
document.querySelectorAll("#galerie-photos img");


miniatures.forEach(function(photo){

    photo.addEventListener("click", function(){

        document
        .getElementById("photo-grand")
        .src = photo.src;

        document
        .getElementById("visionneuse")
        .classList.remove("cache");

    });

});


document
.getElementById("visionneuse")
.addEventListener("click",function(){

    this.classList.add("cache");

});

}