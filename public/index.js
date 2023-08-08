const leaguesToggle = document.getElementById("leagues-toggle")
const leaguesDropdown = document.getElementById("leagues-dropdown")

// leaguesToggle.addEventListener("mouseover", () => {
//      leaguesDropdown.style.display = "flex"
// })

// leaguesToggle.addEventListener("mouse", () => {
//      leaguesDropdown.style.display = "flex"
// })

let s = false;
let linksStatus = false;

function addActive() {
     if(s == false ) {
          let dropdown = document.querySelector(".leagues-dropdown");

          dropdown.classList.remove("hidden");
          s = true;
     } else if(s == true) {
          let dropdown = document.querySelector(".leagues-dropdown");

          dropdown.classList.add("hidden");
          s = false;
          
     }
}


function showLinks() {

     if(linksStatus == false ) {
          let links = document.querySelector(".links");

          links.style.display = "block";
          linksStatus = true;
     } else if(linksStatus == true) {
          let links = document.querySelector(".links");

          links.style.display = "none";
          linksStatus = false;
          
     }
}

//You can remove the 'responsive' class from
//the slider to make it fixed-width.
//find more stuff at http://megdal.be

//edit: fixed bug where responsive slider 
//didn't work until window resize.

$(".slider").each(function() {
    s = $(this);
  
    //create dots and slides
    d = $("<div class='dots'>");
    s.find("div").each(function(i, e) {
      sl = $(this);
      src = sl.attr("src");
      sl.removeAttr("src");
      sl.css("background-image", "url('" + src + "')").addClass("slide");
  
      if (i == 0) {
        d.append("<span class='active'>");
        sl.addClass("active");
      } else if (i == 1) {
        d.append("<span class='next'>");
        sl.addClass("next");
      } else {
        d.append("<span>");
      }
    });
    s.append(d);
  
    //create fading slider
    setInterval(function() {
      s.find(".slide.active").fadeOut(function() {
        s.find(".slide.active").removeClass("active");
        s.find("span.active").removeClass("active");
  
        c = s.find(".slide.next");
        cD = s.find("span.next");
        c.removeClass("next").addClass("active");
        cD.removeClass("next").addClass("active");
  
        n = c.next();
        nD = cD.next();
        if (n.is(".slide")) {
          n.addClass("next");
          nD.addClass("next");
        } else {
          n = s.find(".slide:first-child");
          n.addClass("next");
          s.find(".dots span:first-child").addClass("next");
        }
        n.fadeIn();
      });
    }, 5000);
  
    //create responsive or static
    if (s.hasClass("responsive")) {
      resizeMe(s);
    } else {
      s.css('width', s.attr('width')).css('height', s.attr('height'));
      s.find('div').css('width', s.attr('width')).css('height', s.attr('height'));
    }
  });
  
  $(window).resize(function() {
    $(".slider").each(function() {
      s = $(this);
      if (s.hasClass("responsive")) {
        resizeMe(s);
      }
    });
  });
  
  function resizeMe(s) {
    w = s.parent().width() - 30; //30 is the margin + border width * 2. Change this to whatever you want for more/less space around slider.
    h = w / s.attr('width') * s.attr('height')
    s.css('width', w).css('height', h);
    s.find('.slide').css('width', w).css('height', h);
  }