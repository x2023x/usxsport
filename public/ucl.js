$(document).ready(function(){
        
     var numToShow = 5;
     $(".last-fixtures-body li").hide();
     $('.last-fixtures ul').each(function(){
        var list = $(this).children("li");
        var button = $(this).siblings(".show-more-button");
        var less = $(this).siblings('.show-less-button');
        var numInList = list.length;
        if (numInList > numToShow) {
           button.show();
           less.hide();
        }
       //$(this).children("li:lt('+ numToShow +')").show();
       list.slice(0, numToShow).show();
     });
     
     $('button.show-more-button').click(function(){
       var list = $(this).siblings(".last-fixtures-body").children("li");
       var numInList = list.length;
       var showing = list.filter(':visible').length;
       list.slice(showing - 1, showing + numToShow).fadeIn();
       var nowShowing = list.filter(':visible').length;
       if (nowShowing >= numInList) {
         $(this).hide();
         $(this).next('button.show-less-button').show();
       }
     });

     $('button.show-less-button').click(function () {
       $(this).siblings(".last-fixtures-body").children("li").not(':lt(5)').hide();
       $(this).siblings('button.show-more-button').show();
       $(this).hide();
     });
     
 });




const element = document.querySelector('.next-fixtures');
let imageDownloadBtn = document.querySelector(".download-img-btn")

imageDownloadBtn.addEventListener("click", () => {
  html2canvas(element, { useCORS: true, scale: 7, windowWidth: 1000 }).then(canvas => {
  canvas.toBlob(blob => {
    
    saveAs(blob, 'ucl-heisenport.png');
  }, 'image/png');

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = canvas.toDataURL('image/png');

});
});
