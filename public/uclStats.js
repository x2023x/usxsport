$(document).ready(function(){
        
     var scorersToShow = 5;
     $(".scorers li").hide();
     $('.stats .scorers').each(function(){
        var list = $(this).children("li");
        var button = $(this).siblings(".show-more-button-scorers");
        var less = $(this).siblings('.show-less-button-scorers');
        var numInList = list.length;
        if (numInList > scorersToShow) {
           button.show();
           less.hide();
        }
       //$(this).children("li:lt('+ scorersToShow +')").show();
       list.slice(0, scorersToShow).show();
     });
     
     $('button.show-more-button-scorers').click(function(){
       var list = $(this).siblings(".scorers").children("li");
       var numInList = list.length;
       var showing = list.filter(':visible').length;
       list.slice(showing - 1, showing + scorersToShow).fadeIn();
       var nowShowing = list.filter(':visible').length;
       if (nowShowing >= numInList) {
         $(this).hide();
         $(this).next('button.show-less-button-scorers').show();
       }
     });

     $('button.show-less-button-scorers').click(function () {
       $(this).siblings(".scorers").children("li").not(':lt(5)').hide();
       $(this).siblings('button.show-more-button-scorers').show();
       $(this).hide();
     });
     
        
     var assistsToShow = 5;
     $(".assists li").hide();
     $('.stats .assists').each(function(){
        var list = $(this).children("li");
        var button = $(this).siblings(".show-more-button-assists");
        var less = $(this).siblings('.show-less-button-assists');
        var numInList = list.length;
        if (numInList > assistsToShow) {
           button.show();
           less.hide();
        }
       //$(this).children("li:lt('+ assistsToShow +')").show();
       list.slice(0, assistsToShow).show();
     });
     
     $('button.show-more-button-assists').click(function(){
       var list = $(this).siblings(".assists").children("li");
       var numInList = list.length;
       var showing = list.filter(':visible').length;
       list.slice(showing - 1, showing + assistsToShow).fadeIn();
       var nowShowing = list.filter(':visible').length;
       if (nowShowing >= numInList) {
         $(this).hide();
         $(this).next('button.show-less-button-assists').show();
       }
     });

     $('button.show-less-button-assists').click(function () {
       $(this).siblings(".assists").children("li").not(':lt(5)').hide();
       $(this).siblings('button.show-more-button-assists').show();
       $(this).hide();
     });
     
        
     var penalitiesToShow = 5;
     $(".penalities li").hide();
     $('.stats .penalities').each(function(){
        var list = $(this).children("li");
        var button = $(this).siblings(".show-more-button-penalities");
        var less = $(this).siblings('.show-less-button-penalities');
        var numInList = list.length;
        if (numInList > penalitiesToShow) {
           button.show();
           less.hide();
        }
       //$(this).children("li:lt('+ penalitiesToShow +')").show();
       list.slice(0, penalitiesToShow).show();
     });
     
     $('button.show-more-button-penalities').click(function(){
       var list = $(this).siblings(".penalities").children("li");
       var numInList = list.length;
       var showing = list.filter(':visible').length;
       list.slice(showing - 1, showing + penalitiesToShow).fadeIn();
       var nowShowing = list.filter(':visible').length;
       if (nowShowing >= numInList) {
         $(this).hide();
         $(this).next('button.show-less-button-penalities').show();
       }
     });

     $('button.show-less-button-penalities').click(function () {
       $(this).siblings(".penalities").children("li").not(':lt(5)').hide();
       $(this).siblings('button.show-more-button-penalities').show();
       $(this).hide();
     });
     
        
     var redCardsToShow = 5;
     $(".redCards li").hide();
     $('.stats .redCards').each(function(){
        var list = $(this).children("li");
        var button = $(this).siblings(".show-more-button-redCards");
        var less = $(this).siblings('.show-less-button-redCards');
        var numInList = list.length;
        if (numInList > redCardsToShow) {
           button.show();
           less.hide();
        }
       //$(this).children("li:lt('+ redCardsToShow +')").show();
       list.slice(0, redCardsToShow).show();
     });
     
     $('button.show-more-button-redCards').click(function(){
       var list = $(this).siblings(".redCards").children("li");
       var numInList = list.length;
       var showing = list.filter(':visible').length;
       list.slice(showing - 1, showing + redCardsToShow).fadeIn();
       var nowShowing = list.filter(':visible').length;
       if (nowShowing >= numInList) {
         $(this).hide();
         $(this).next('button.show-less-button-redCards').show();
       }
     });

     $('button.show-less-button-redCards').click(function () {
       $(this).siblings(".redCards").children("li").not(':lt(5)').hide();
       $(this).siblings('button.show-more-button-redCards').show();
       $(this).hide();
     });
     
        
     var yellowCardsToShow = 5;
     $(".yellowCards li").hide();
     $('.stats .yellowCards').each(function(){
        var list = $(this).children("li");
        var button = $(this).siblings(".show-more-button-yellowCards");
        var less = $(this).siblings('.show-less-button-yellowCards');
        var numInList = list.length;
        if (numInList > yellowCardsToShow) {
           button.show();
           less.hide();
        }
       //$(this).children("li:lt('+ yellowCardsToShow +')").show();
       list.slice(0, yellowCardsToShow).show();
     });
     
     $('button.show-more-button-yellowCards').click(function(){
       var list = $(this).siblings(".yellowCards").children("li");
       var numInList = list.length;
       var showing = list.filter(':visible').length;
       list.slice(showing - 1, showing + yellowCardsToShow).fadeIn();
       var nowShowing = list.filter(':visible').length;
       if (nowShowing >= numInList) {
         $(this).hide();
         $(this).next('button.show-less-button-yellowCards').show();
       }
     });

     $('button.show-less-button-yellowCards').click(function () {
       $(this).siblings(".yellowCards").children("li").not(':lt(5)').hide();
       $(this).siblings('button.show-more-button-yellowCards').show();
       $(this).hide();
     });
     
        
     var cleanSheetsToShow = 5;
     $(".cleanSheets li").hide();
     $('.stats .cleanSheets').each(function(){
        var list = $(this).children("li");
        var button = $(this).siblings(".show-more-button-cleanSheets");
        var less = $(this).siblings('.show-less-button-cleanSheets');
        var numInList = list.length;
        if (numInList > cleanSheetsToShow) {
           button.show();
           less.hide();
        }
       //$(this).children("li:lt('+ cleanSheetsToShow +')").show();
       list.slice(0, cleanSheetsToShow).show();
     });
     
     $('button.show-more-button-cleanSheets').click(function(){
       var list = $(this).siblings(".cleanSheets").children("li");
       var numInList = list.length;
       var showing = list.filter(':visible').length;
       list.slice(showing - 1, showing + cleanSheetsToShow).fadeIn();
       var nowShowing = list.filter(':visible').length;
       if (nowShowing >= numInList) {
         $(this).hide();
         $(this).next('button.show-less-button-cleanSheets').show();
       }
     });

     $('button.show-less-button-cleanSheets').click(function () {
       $(this).siblings(".cleanSheets").children("li").not(':lt(5)').hide();
       $(this).siblings('button.show-more-button-cleanSheets').show();
       $(this).hide();
     });
     
        
     var penalitySaveToShow = 5;
     $(".penalitySave li").hide();
     $('.stats .penalitySave').each(function(){
        var list = $(this).children("li");
        var button = $(this).siblings(".show-more-button-penalitySave");
        var less = $(this).siblings('.show-less-button-penalitySave');
        var numInList = list.length;
        if (numInList > penalitySaveToShow) {
           button.show();
           less.hide();
        }
       //$(this).children("li:lt('+ penalitySaveToShow +')").show();
       list.slice(0, penalitySaveToShow).show();
     });
     
     $('button.show-more-button-penalitySave').click(function(){
       var list = $(this).siblings(".penalitySave").children("li");
       var numInList = list.length;
       var showing = list.filter(':visible').length;
       list.slice(showing - 1, showing + penalitySaveToShow).fadeIn();
       var nowShowing = list.filter(':visible').length;
       if (nowShowing >= numInList) {
         $(this).hide();
         $(this).next('button.show-less-button-penalitySave').show();
       }
     });

     $('button.show-less-button-penalitySave').click(function () {
       $(this).siblings(".penalitySave").children("li").not(':lt(5)').hide();
       $(this).siblings('button.show-more-button-penalitySave').show();
       $(this).hide();
     });
     
 });