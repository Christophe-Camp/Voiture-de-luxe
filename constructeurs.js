fetch("luxdrive_site_data_full.json")   //importation du fichier json + verification si il est bien importer
  .then(function(response) {
    if (!response.ok) {
        throw new Error("Erreur : le fichier JSON n’a pas pu être chargé.");
    }
    return response.json(); 
  })

  .then(function(data) {

    let listeLogo = document.getElementById("listeconstructeurs");                       
    for (let i = 0; i < data.brands.length; i++) {
        let logo = data.brands[i];
        let div = document.createElement("div");
        
        let texteIntro = data.pagesContent.Constructeurs.intro;  // on va chercher la phrase d'intro 

    
        console.log("textIntro")
        let html = "<img src=" + logo.logo + ">";
        html += "<p>" + logo.name + " </p>";
        html += "<p>" + texteIntro + " </p>";
        
        div.innerHTML = html;
        listeLogo.appendChild(div);
        
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