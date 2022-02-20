/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready


// let token;

var httpRequest;
document.getElementById("connexion").addEventListener('click', makeRequest);
const caseErreur = document.getElementById('erreur');

const URL = document.getElementById('URL');
const chemin = document.getElementById('chemin'); 
const NomDeDomaine = document.querySelector('#NomDeDomaine'); // // emplament ou afficher le nom de domaine
const affchemin = document.querySelector('#affchemin');// emplament ou afficher le chemin vers votre Dolibarr
let AdressIP = '';
let loc = '';

  URL.addEventListener('input', function(event) { // ecrit et prend pour valeur le nom de domaine ecrit
    NomDeDomaine.innerHTML = event.target.value;
    AdressIP = event.target.value;

  });

  chemin.addEventListener('input', function(event) { // ecrit et prend pour valeur le chemin
  affchemin.innerHTML = event.target.value;

  loc = event.target.value;
  });


function makeRequest() { // function utiliser quand on clique sur le bouton connexion 

  const identifiant = document.getElementById('identifiant').value;
  const mdp = document.getElementById('mdp').value;

  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    console.log('Abandon :frowning: Impossible de créer une instance de XMLHTTP');
    return false;
  }

  httpRequest.onreadystatechange = alertContents;

  httpRequest.open('GET', "http://" + AdressIP + "" + loc + "/api/index.php/login?login=" + identifiant + "&password=" + mdp + "&reset=0"); // requete pour demander le token

  httpRequest.send();

  Redirection();
}

function alertContents() { 

  if (httpRequest.readyState === XMLHttpRequest.DONE) { 
    if (httpRequest.status === 200) { // verification l'etat de la requetes (200 = bon fonctionnement de la requetes)
      var rep = httpRequest.responseText;
      var repJSON = JSON.parse(rep);
      token = repJSON.success.token;
      id_user = repJSON.success.id;

    } else {
      caseErreur.innerHTML = "<p class='warning'> Mot de passe ou Identifiant incorrect // Ou probleme de requetes</p>";
    }
  }
}

function Redirection() {

  setTimeout(() => {

    const Verif = new Promise((resolve, reject) => {  // Condition qui verifie si le token est definie.
      if (typeof token != "undefined") {
        resolve();
      } else {
        reject();
      }
    })

    Verif.then(() => { // passage vers la prochaine page
      alert('Bienvenue')
      window.location.href = 'formulaire.html?token=' + token + '&AdressIP=' + AdressIP +'&Location=' + loc +'';

    }).catch(() => { // message d'erreur
      caseErreur.innerHTML = "<p class='warning'> Mot de passe ou Identifiant incorrect // Ou probleme de requetes</p>";

    })

  }, 2000);
}