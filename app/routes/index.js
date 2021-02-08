var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt = require('jsonwebtoken')
const Team = require('../controllers/team')

if(typeof localStorage === "undefined" || localStorage === null){
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localState');
}

/* GET home page. */

router.get('/', function(req, res) {
  Team.listar()
    .then(dados => res.render('teams', {teams: dados}))
    .catch(e => res.status(500).jsonp({error: e}))

});

router.get('/teams/:id', function(req, res) {
  Team.consultar(req.query.id)
    .then(dados => res.render('team', {team: dados}))
    .catch(e => res.status(500).jsonp({error: e}))

});

router.get('/api/token', function(req, res) {
  jwt.sign("DAW-PRI-2020-recurso", function(e,token) {
      res.status(201).jsonp({token: token})

    })

});

router.get('/addTeam', function(req, res) {
  res.render('addTeam')
});


router.post('/addTeam', function(req, res) {
  Team.inserirEquipe(req.body)
    .then(dados => res.send('Equipa inserida'))
    .catch(e => res.status(500).jsonp({error: e}))
});


router.get('/api/teams', function(req, res, next) {
  Team.listar()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});


router.post('/api/teams', function(req, res) {
  Team.inserirEquipe(req.body)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});


router.get('/api/teams/:id', function(req, res) {
  Team.consultar(req.query.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/api/teams/:id/members/:idMember', function(req, res) {
  Team.listar(req.query.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.post('/api/teams', function(req, res, next) {
  Team.inserirEquipe(req.body)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});


router.delete('/api/teams/:id', function(req, res, next) {
  Team.deleteEquipe(req.query.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});


module.exports = router;
