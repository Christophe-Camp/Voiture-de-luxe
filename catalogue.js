fetch("luxdrive_site_data_full.json")   //importation du fichier json + verification si il est bien importer
  .then(function(response) {
    if (!response.ok) {
        throw new Error("Erreur : le fichier JSON n’a pas pu être chargé.");
    }
    return response.json(); 
  })


  .then(function(data) {
    let listeVoitures = document.getElementById("listevoitures");

    for (let i = 0; i < data.cars.length; i++) {  // on viens chercher toute les voitures 
      let lVoitures = data.cars[i];
      let marque = null;

      for (let j = 0; j < data.brands.length; j++) {
        if(lVoitures.brandId === data.brands[j].id ){
          marque = data.brands[j];
          break;
        }
      }

    let carDetails = Object.values(data.pagesContent.carDetails);
    
    for (let k = 0; k < carDetails.length; k++) {
      if(lVoitures.name === carDetails[k].title) {
        details = carDetails[k];
        break;
      }
    }

    if (marque && details) {
      let div = document.createElement("div");
      div.classList.add("col");

      let cards = document.createElement("div");
      cards.classList.add("card", "p-5");

      let html = "<p>" + lVoitures.name + "</p>";
      html += "<img src="+ lVoitures.image +" alt="+ lVoitures.name +"> ";
      html += "<p>" + lVoitures.price + " €</p>";
      html += "<p>" + marque.name + "</p>";
      html += "<a href='#' class='voirDetails'>Voir détails</a>"; // description qui est masquer 
      html += "<div class='d-none cardescription '>"
      html+=  "<p><strong>Description :</strong> " + details.introduction + "</p>";
      html+=  "<p>" + details.title + "</p>";
      html+=  "<p>" + details.gallery + "</p>";
      html+="</div>";
      

      cards.innerHTML = html;
      div.appendChild(cards);
      listeVoitures.appendChild(div);

      let voirDetails = cards.querySelector('.voirDetails');
      let cardescription = cards.querySelector('.cardescription');

        voirDetails.addEventListener("click", function() {  //on ecoute au clique pour voir details pour afficher ou masquer les details 
          if (cardescription.classList.contains("d-none")) {
            cardescription.classList.remove("d-none");
            cardescription.classList.add("d-block");
            
          } else {
            cardescription.classList.remove("d-block");
            cardescription.classList.add("d-none");
          
          }
        })
    }
  }
    let footer = document.getElementById("Mentionlegale");    // liens et mention legale dans le footer
    for (let y = 0; y < data.footer.links.length; y++) {
        let liste = data.footer.links[y];
        let div = document.createElement("div");
    
        let html = "<p>" + liste.label + "</p>";
        html += "<p>" + liste.url + "</p>";
        
        div.innerHTML = html;
        footer.appendChild(div);
    }
    let footerSocial = document.getElementById("social");  //reseaux sociaux
    if (data.footer && data.footer.socials) {
        let socials = data.footer.socials;
        let div = document.createElement("div");
    
        let html = "<p>Instagram" + socials.instagram + "</p>";
        html += "<p>Youtube" + socials.youtube + "</p>";
        html += "<p>Twitter" + socials.twitter + "</p>";
        
        div.innerHTML = html;
        footerSocial.appendChild(div);
    }
})
.catch(function(error) {
        console.error("Erreur : " + error.message);
});