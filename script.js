fetch("luxdrive_site_data_full.json")   //importation du fichier json + verification si il est bien importer
  .then(function(response) {
    if (!response.ok) {
        throw new Error("Erreur : le fichier JSON n’a pas pu être chargé.");
    }
    return response.json(); 
  })

  .then(function(data) {

    let stats = document.getElementById("stats");                       // categorie stats 
    for (let i = 0; i < data.pagesContent.Accueil.stats.length; i++) {
        let stat = data.pagesContent.Accueil.stats[i];
        let div = document.createElement("div");
       
        let html = "<p><strong>" + stat.label + "</strong></p>";
        html += "<p>" + stat.value + " unités</p>";
        
        div.innerHTML = html;
        stats.appendChild(div);
    }
    
    let avis = document.getElementById("avis");                       // section testimonials
    for (let x = 0; x < data.testimonials.length; x++) {
        let avisClients = data.testimonials[x];
        let div = document.createElement("div");                                                    // a continuer carouselle pour les avis client 
       
        let html =`<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">    
            <div class="carousel-inner">

            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        `
        
         "<p><strong>" + avisClients.name + "</strong></p>";
        html += "<p>" + avisClients.note + " ★ </p>";
        html += "<p>" + avisClients.message + "</p>";
        
        div.innerHTML = html;
        avis.appendChild(div);
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