const express = require("express");

const ActionDb = require('../data/helpers/actionModel')
const ProjectDb = require('../data/helpers/projectModel')

const router = express.Router();

router.get('/', (req, res) => {
    ActionDb.get()
    .then(actions => {
        res.status(200).json(actions)
    })
})

router.post('/', validateProjectId, (req, res) => {
    ActionDb.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/:id', (req, res) => {
    ActionDb.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)

    })
})

router.put('/:id', (req, res) => {
    ActionDb.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
    })

})

router.delete('/:id', (req, res) => {
    ActiontDb.remove(req.params.id)
    .then(count => {
        if (count) {
            res.status(200).json({message: 'action deleted'})
          } else {
            res.status(404).json({ message: "action not found" });
          }
    })
    .catch(err => {
        console.log(err)
    })
})

function validateProjectId(req, res, next){
    ProjectDb.get(req.body.project_id)
    .then(project => {
        if(project){
            console.log(project)
            next()
        } else {
            res.status(400).json({message: 'invalid project id'})
        }
    })
    .catch(err => {
        res.status(500).json({ err: error.message })
    })
}

module.exports = router