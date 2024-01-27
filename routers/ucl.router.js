const express = require('express');
const axios = require('axios');
const moment = require("moment");

const router  = express.Router();

async function getMatches() {
     try {
          
          let url = `https://api.football-data.org/v4/competitions/2001/matches`;
          
          await axios.get(url, { headers: { "X-Auth-Token": "a89d53abb2da4790bdc6cd3a5f27529a" } })
          .then(async function(response) {
               fixtures = response.data.matches
               return fixtures
          });

     } catch (error) {
          console.log(error)
     }
}

async function getGroupMatches() {
     try {
          
          let url = `https://api.football-data.org/v4/competitions/2001/standings`;
          
          await axios.get(url, { headers: { "X-Auth-Token": "a89d53abb2da4790bdc6cd3a5f27529a" } })
          .then(async function(response) {
               groups = response.data
               return groups
          });

     } catch (error) {
          console.log(error)
     }
}

async function getStats() {
     try {
          
          let url = `https://webws.365scores.com/web/stats?competitions=572`;
          
          await axios.get(url)
          .then(async function(response) {
               stats = response.data
               return stats
          });

     } catch (error) {
          console.log(error)
     }
}

async function getBrackets() {
     try {
          
          let url = `https://api.football-data.org/v4/competitions/2001/matches?stage=LAST_16,QUARTER_FINALS,SEMI_FINALS,FINAL`;
          
          await axios.get(url, { headers: { "X-Auth-Token": "a89d53abb2da4790bdc6cd3a5f27529a" } })
          .then(async function(response) {
               brackets = response.data
               return brackets
          });

     } catch (error) {
          console.log(error)
     }
}

router.get("/ucl", async (req, res) => {

     try {
          await getStats()
          await getMatches()
          
          res.render("./ucl/ucl.ejs", {
               error: null,
               pageTitle: "دوري ابطال اوروبا - مباريات ونتائج واحصائيات"
          });
          
                    
     } catch (error) {
          res.render("./ucl/ucl.ejs", {
               error: "Failed to load, server connection lost",
               pageTitle: "حدث خطأ في جلب المعلومات"
          });
          console.log(error);
     }
});

router.get("/ucl/stats", async (req, res) => {

     try {

          await getStats()
          
          res.render("./ucl/stats.ejs", {
               error: null,
               pageTitle: "الهدافون واحصائيات اخرى دوري ابطال اوروبا"
          });
          
                    
     } catch (error) {
          res.render("./ucl/stats.ejs", {
               error: "Failed to load, server connection lost",
               pageTitle: "حدث خطأ في جلب المعلومات"
          });
          console.log(error);
     }
});

router.get("/ucl/brackets", async (req, res) => {

     try {
          await getBrackets()

          res.render("./ucl/brackets.ejs", {
               error: null, moment,
               pageTitle: "دوري ابطال اوروبا - مرحلة الاقصائيات", brackets
          });
          
     } catch (error) {
          res.render("./ucl/brackets.ejs", {
               error: "حدث خطأ اثناء جلب المعلومات", moment,
               pageTitle: "حدث خطأ في جلب المعلومات"
          });
          console.log(error);
     }
});

router.get("/ucl/groups", async (req, res) => {

     try {

          await getGroupMatches();
          res.render("./ucl/groups.ejs", {
               error: null, moment,
               pageTitle: "دوري ابطال اوروبا - دور المجموعات"
          });
          
                    
     } catch (error) {
          res.render("./ucl/groups.ejs", {
               error: "Failed to load, server connection lost", moment,
               pageTitle: "حدث خطأ في جلب المعلومات"
          });
          console.log(error);
     }
});

module.exports = router; 