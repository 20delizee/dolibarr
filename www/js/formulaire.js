// const identifiant = document.getElementById('identifiant') // recherche p
// const mdp = document.getElementById('mdp')
// const identifiant = document.getElementById('identifiant') // recherche p
// const mdp = document.getElementById('mdp')


function GetParametre(parameterName) { // permet de recuperer les donnée dans l'URL grace a la methode GET.
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
};

function ResetInput() { // apres envoie de la demande de remboursement effacement de tout les inputs (texte)
    document.getElementById("ddp").value = "";
    document.getElementById("libelle").value = "";
    document.getElementById("montant").value = "";
}

const caseSisi = document.querySelector('#sisi'); // emplacement message d'envoie ou d'erreur
const envoie = document.getElementById('envoie');


envoie.addEventListener("click", myFunction); // bouton envoie

function myFunction() { // function lancé quand le bouton soumettre est pressé.
    var date = new Date(document.getElementById("ddp").value);
    var dateTimestamp = date.getTime() / 1000;
    var libelle = document.getElementById("libelle").value;
    var montant = document.getElementById("montant").value;
    var mode = document.querySelector('#mode').value;

    token = GetParametre("token"); // recupere la valeur token dans l'URL
    NomDeDomaine = GetParametre("AdressIP");// recupere la valeur NomDeDomaine dans l'URL
    loc = GetParametre("Location");// recupere la valeur LOCATION dans l'URL

    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        console.log('Erreur | Impossible de créer l\'instance XMLHttpRequest');
        return false;
    }

    httpRequest.onreadystatechange = alertContents; 

    httpRequest.open('POST', 'http://' + NomDeDomaine + "" + loc + '/api/index.php/bankaccounts/1/lines');
    httpRequest.setRequestHeader('DOLAPIKEY', token);
    httpRequest.setRequestHeader("Content-Type", "application/json")
    httpRequest.send('{ "date": "' + dateTimestamp + '", "type": "' + mode + '", "label":"' + libelle + '",  "amount":' + parseInt(montant) + '}');


    function alertContents() {
        setTimeout(() => {

            if (httpRequest.status === 200) { // La requete a ete envoyer

                caseSisi.innerHTML = "<p class='succes'> Votre demande a été prise avec succes</p>";

            } else { // la requete a eu une erreur
                caseSisi.innerHTML = "<p class='warning'> Assure-vous d'avoir bien rempli toute les champs </p>";
            }

        }, 1000);

    }

    ResetInput(); // reset Input (text) apres envoie
};


let app = { // function pour l'appareil photo
    init: function () {
        document.getElementById('CapturePhoto').addEventListener('click', app.takephoto);
    },
    takephoto: function () {
        let opts = {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 200,
            targetHeight: 400
        };

        navigator.camera.getPicture(app.ftw, app.wtf, opts);
    },
    ftw: function (imgURI) {
        document.getElementById('msg').textContent = imgURI;
        document.getElementById('photo').src = imgURI;

    },
    wtf: function (msg) {
        document.getElementById('msg').textContent = msg;
    }
};

document.addEventListener('deviceready', app.init);