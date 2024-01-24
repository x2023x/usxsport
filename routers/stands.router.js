const express = require('express');
const axios = require('axios');

const router  = express.Router();


let leagues = {
     premierLeague: 2021,
     ucl: 2001,
     ligue1: 2015,
     bundesliga: 2002,
     serieA: 2019,
     laliga: 2014
}

async function getStanding(leagueCode) {
     try {
          const config = {
               method: 'get',
               maxBodyLength: Infinity,
               url: `https://api.football-data.org/v4/competitions/${leagueCode}/standings`,
               headers: { 
                 'Content-Type': 'application/json', 
                 'X-Auth-Token': 'a89d53abb2da4790bdc6cd3a5f27529a'
               }
             };
           
            await axios(config)
             .then(async function (response)  {
           
               responseData = await response.data;
           
               seasonInfo = responseData.season
           
               standings = responseData.standings[0].table
           
               return responseData, standings, seasonInfo
           })
     } catch (error) {
          console.log(error)
     }
}

async function getMatches(leagueCode) {
     try {
          const config = {
               method: 'get',
               maxBodyLength: Infinity,
               url: `https://api.football-data.org/v4/competitions/${leagueCode}/matches?matchday=${seasonInfo.currentMatchday}`,
               headers: { 
                 'Content-Type': 'application/json', 
                 'X-Auth-Token': 'a89d53abb2da4790bdc6cd3a5f27529a'
               }
             };     
           
            await axios(config)
             .then(async function (response)  {
           
              responseMatches = await response.data;
           
              matches = responseMatches.matches
               return responseMatches, matches
           })
     } catch (error) {
          console.log(error)
     }
  
   
}
   
router.get('/laliga-table', async function(req, res) {

     try {
         let data = await getStanding(leagues.laliga);
         let mtchs = await getMatches(leagues.laliga);
          res.render('./standings/laliga.ejs', {
               standings, seasonInfo, matches,
               error: null,
               pageTitle: "ترتيب الدوري الاسباني لاليغا"
            });
     } catch (error) {
          res.render('./standings/laliga.ejs', {
               standings:null, seasonInfo:null, matches:null,
               error:"Failed to load, server connection lost",
               pageTitle: "حدث خطأ في جلب الدوري الاسباني"
            });
     }
});
   
router.get('/bundesliga-table', async function(req, res) {

     try {
         let stands = await getStanding(leagues.bundesliga);
         let mtchs = await getMatches(leagues.bundesliga);
        
          res.render('./standings/bundesliga.ejs', {
             standings, seasonInfo, matches,
             error: null,
             pageTitle: "ترتيب الدوري الالماني البوندسليغا"
          });
     } catch (error) {
          res.render('./standings/bundesliga.ejs', {
               standings:null, seasonInfo:null, matches:null,
               error: "Failed to load the standing, server connection lost",
               pageTitle: "حدث خطأ في جلب الدوري الالماني"
            }); 
     }
});
   
router.get('/seriea-table', async function(req, res) {

     try {
         let stands = await getStanding(leagues.serieA);
         let mtchs = await getMatches(leagues.serieA);
          res.render('./standings/serieA.ejs', {
             standings, seasonInfo, matches,
             error: null,
             pageTitle: "ترتيب الدوري الايطالي"
          });
     } catch (error) {
          res.render('./standings/serieA.ejs', {
               standings:null, seasonInfo:null, matches:null,
               error: "Failed to load the standing, server connection lost",
               pageTitle: "حدث خطأ في جلب الدوري الايطالي"
            }); 
     }
});
   
router.get('/premierleague-table', async function(req, res) {

     try {
         let stands = await getStanding(leagues.premierLeague);
         let mtchs = await getMatches(leagues.premierLeague);
          res.render('./standings/premierLeague.ejs', {
             standings, seasonInfo, matches,
             error: null,
             pageTitle: "ترتيب الدوري الانكليزي الممتاز البريميرليغ"
          });
     } catch (error) {
          res.render('./standings/premierLeague.ejs', {
               standings:null, seasonInfo:null, matches:null,
               error: "Failed to load the standing, server connection lost",
               pageTitle: "حدث خطأ في جلب الدوري الانكليزي"
            }); 
     }
});
   
router.get('/liguea-table', async function(req, res) {

     try {
         let stands = await getStanding(leagues.ligue1);
         let mtchs = await getMatches(leagues.ligue1);
          res.render('./standings/liguea.ejs', {
             standings, seasonInfo, matches,
             error: null,
             pageTitle: "ترتيب الدوري الفرنسي ليغ 1"
          });
     } catch (error) {
          res.render('./standings/liguea.ejs', {
               standings:null, seasonInfo:null, matches:null,
               error: "Failed to load the standing, server connection lost",
               pageTitle: "حدث خطأ في جلب الدوري الفرنسي"
            }); 
     }
});

module.exports = router;