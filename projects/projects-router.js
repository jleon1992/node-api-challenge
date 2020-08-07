const express = require('express');
const ProjectDb = require('../data/helpers/projectModel')
const router = express.Router();

router.get('/', (req, res) => {
    ProjectDb.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err).json({message: 'not found'})
    })
})

router.post('/', (req, res) => {
    ProjectDb.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
})

router.get('/:id', (req, res) => {
    ProjectDb.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
    })
})

router.put('/:id', (req, res) => {
    ProjectDb.update(req.params.id, req.body)
    .then(project => {
        res.status(202).json({message: 'project updated', data: project})
    })
    .catch(err => {
        console.log(err)
    })
})

router.delete('/:id', (req, res) => {
    ProjectDb.remove(req.params.id)
    .then(count => {
        if (count) {
            res.status(204).json({message: 'project deleted'}).end();
          } else {
            res.status(404).json({ message: "project not found" });
          }
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router;
