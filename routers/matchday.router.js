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


router.get("/matchday", async (req, res) => {

     try {

          let date = req.query.date;
          
          await getFixtures(date)
          res.render("./matchs/matchday.ejs", {
               error: null,
               pageTitle: "مباريات اليوم و مباريات الغد"
          });

     } catch (error) {
          res.render("./matchs/matchday.ejs", {
               error: "Failed to load matches, server connection lost",
               pageTitle: "حدث خطأ في جلب المباريات"
          });
          console.log(error);
     }
});


module.exports = router;
