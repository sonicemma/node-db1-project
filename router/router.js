const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res)=> {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.get('/:id', (req, res) => {
    db ('accounts')
    .where ('id', req.params.id)
    .first()
    .then (account => {
        if (account){
            res.status(200).json(account)
        } else {
            res.status(404).json({message: 'ID not found'})
        }
    })
})

router.post('/', (req, res) => {
    db('accounts')
    .insert(req.body, 'id')
    .then(newID => {
        const id = newID[0];
        db('accounts')
        .where({id})
        .first()
        .then(newAccount => {
            res.status(200).json(newAccount)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    })
})

router.patch('/:id', (req, res) => {

    const {id} = req.params
    const changes = req.body;

    db('accounts')
    .where({id})
    .update(changes)
    .then(num => {
        if (num > 0) {
            res.status(200).json({message: 'updated'})
        } else {
            res.status(404).json({message: 'error'})
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.delete('/:id', (req,res) => {

    db('accounts')
    .where('id', req.params.id)
    .del()
    .then(deleted => {
    if (deleted) {
        res.status(200).json({message: 'deleted'})
    } else {
        res.status(404).json({message: 'error'})
    }
}) 
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

module.exports = router;