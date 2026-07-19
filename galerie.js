const boutonGalerie =
document.getElementById("ouvrir-galerie");


boutonGalerie.addEventListener("click", function(){


    const code =
    document.getElementById("code-galerie")
    .value
    .trim()
    .toLowerCase();


    const message =
    document.getElementById("message-galerie");


    if(code === "dame chloé"){


    message.innerHTML =
    `
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


}


    else{


        message.innerText =
        "❌ IDENTITÉ NON RECONNUE";


    }


});

const boutonLien =
document.getElementById("copier-lien-galerie");


if(boutonLien){

    boutonLien.addEventListener("click", function(){


        const lien =
        window.location.href;


        navigator.clipboard.writeText(lien)
        .then(function(){


            document
            .getElementById("message-lien")
            .innerText =
            "🔗 LIEN GALERIE COPIÉ — À CONSERVER PRÉCIEUSEMENT";


        });


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
.addEventListener("click", function(){

    this.classList.add("cache");

});