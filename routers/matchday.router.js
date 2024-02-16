const express = require('express');
const axios = require('axios');
const moment = require("moment");

const router  = express.Router();

let leagues = {
     premierLeague: 2021,
     ucl: 2001,
     ligue1: 2015,
     bundesliga: 2002,
     serieA: 2019,
     laliga: 2014,
     eredivisie: 2003,
     primeiraLiga: 2017,
     championship: 2016,
     ucl: 2001
}

async function getFixtures(date) {

     try {
          let url = `https://api.football-data.org/v4/matches?competitions=${leagues.ucl},${leagues.laliga},${leagues.bundesliga},${leagues.serieA},${leagues.ligue1},${leagues.premierLeague},${leagues.eredivisie},${leagues.primeiraLiga},${leagues.championship}&date=${date}`;

          if(date == undefined || date == null) {
               url = `https://api.football-data.org/v4/matches?competitions=${leagues.ucl},${leagues.laliga},${leagues.bundesliga},${leagues.serieA},${leagues.ligue1},${leagues.premierLeague},${leagues.eredivisie},${leagues.primeiraLiga},${leagues.championship}&date=${moment().format("YYYY-MM-DD")}`;
          }

          if(moment(date).isValid() == false) {
               url = `https://api.football-data.org/v4/matches?competitions=${leagues.ucl},${leagues.laliga},${leagues.bundesliga},${leagues.serieA},${leagues.ligue1},${leagues.premierLeague},${leagues.eredivisie},${leagues.primeiraLiga},${leagues.championship}&date=${moment().format("YYYY-MM-DD")}`;
          } 

          await axios.get(url, { headers: { "X-Auth-Token": "a89d53abb2da4790bdc6cd3a5f27529a" } })
          .then(async function(response) {
               fixtures = response.data.matches
               return fixtures
          });

     } catch (error) {
          console.log(error)
     }
}

async function getEventsByDay(date){
     try {

          let url = `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${date}`
         
          if(date == undefined || date == null){
               url = `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${(moment().format("YYYY-MM-DD"))}`
          }
          if(moment(date).isValid() == false){
               url = `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${(moment().format("YYYY-MM-DD"))}`
          }

          await axios.get(url, {
               headers: {
                    "Accept": "*/*",
                    "Accept-Encoding": "br; q=1.0, gzip;q=0.9, deflate;q=0.8",
                    "Cache-Control": "max-age=0",
                    "Accept-Language": "ar-IQ",
                    "Connection": "keep-alive",
                    "Host": "api.sofascore.com",
                    "If-None-Match": 'W/"28477692fb"',
                    "User-Agent": "SofascoreApp/6.7.29 (com.SofaScore.iOS; build:20240202.54; iOS 17.3.0) Alamofire/5.8.0 84c"
               }
          })
          .then(async function(response){
               events = response.data
               return events
          })
          return events
     } catch (error) {
          console.log(error)
     }
}

router.get("/matchday", async (req, res) => {

     try {
          let date = req.query.date;
          let events = await getEventsByDay(date);
     
          res.render("./matchs/matchday.ejs", {
               error: null,
               pageTitle: "مباريات اليوم و مباريات الغد",
               events
          });

     } catch (error) {
          res.render("./matchs/matchday.ejs", {
               error: "Failed to load matches, server connection lost",
               pageTitle: "حدث خطأ في جلب المباريات",
               events: null,
          });
          console.log(error);
     }
});


module.exports = router;
