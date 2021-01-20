const { Router } = require('express');
let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const journal = require('../models/journal');
const { route } = require('./usercontroller');
const Journal = require('../db').import('../models/journal');

router.get('/practice', validateSession, function(req,res)
{res.send('Hey!! This is a practice route!')})

/*********************
 *****CREATE JOURNAL
 ********************/

router.post('/create', validateSession, function(req, res) {
    const journalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
        owner: req.user.id
    }
    Journal.create(journalEntry)
        .then(journal => res.status(200).json(journal))
        .catch(err => res.status(500).json({error:err}))
})

/*********************
 *****GET JOURNAL
 ********************/

 router.get('/', (req, res) => {
     Journal.findAll()
     .then(journals => res.status(200).json(journals))
     .catch(err => res.status(500).json({error: err}))
 });

/*************************
 *****GET JOURNAL BY USER
 **************************/

 router.get('/mine', validateSession, (req, res) => {
     let userid = req.user.id
     Journal.findAll({
         where: { owner: userid } 
     })
     .then(journals => res.status(200).json(journals))
     .catch(err => ({error: err}))
 });

/*************************
 *****GET JOURNAL BY TITLE
 **************************/

router.get('/:title', (req, res) => {
    let title = req.params.title;

    Journal.findAll({
        where: {title: title}
    })
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({error: err}))
});

/*************************
 *****JOURNAL UPDATE
 **************************/

//PUT = replace what is there with what I am providing (we've used update in the route for simplicity)

router.put('/update/:entryId', validateSession, (req, res) => {
    const udpateJournalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
    };
     const query = { where: { id: req.params.entryId, owner: req.user.id}};

     Journal.update(udpateJournalEntry, query)
     .then((journals) => res.status(200).json(journals))
     .catch((err) => res.status(500).json({error: err}));
});
/*************************
 *****JOURNAL DELETE
 **************************/

 router.delete ('/delete/:id', validateSession, (req, res) => {
     const query = {where: { id: req.params.id, owner: req.user.id}};

     Journal.destroy(query)
     .then(() => res.status(200).json({message: 'Journal Entry Removed'}))
     .catch(() => res.status(500).json({error: err}));
 });

module.exports = router;