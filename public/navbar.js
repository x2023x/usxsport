let linksList = document.getElementsByClassName("links");
let hamburger = document.getElementById("hamburger");
let linksStatusList = false;

function showLinks() {
     if(linksStatusList == false ) {
          linksList.style.display = "flex";
          linksStatusList = true;
     } else if(linksStatusList == true) {
          linksList.style.display = "none";
          linksStatusList = false;
     }
}