/* jshint esversion: 6 */
let express = require('express');
let router = express.Router();
let mongojs = require('mongojs');

let db = mongojs('mongodb://<username>:<databaseConnectionString>', ['tasks']);

// Get All Tasks
router.get('/tasks', function(req, res, next) {
    db.tasks.find(function(err, tasks) {
        if(err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

// Get Single Task (READ)
router.get('/task/:id', function(req, res, next) {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
        if(err) {
            res.send(err);
        }
        res.json(task);
    });
});

// Save Task (UPDATE)
router.post('/task', function(req, res, next) {
    let task = req.body;
    if(!task.title || !(task.isDone + '')) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.tasks.save(task, function(err, task) {
            if(err) {
                res.send(err);
            }
            res.json(task);
        });
        db.tasks.insert({"title": task.title, "isDone": false});
    }
});

// Delete Task (DELETE)
router.delete('/task/:id', function(req, res, next) {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
        if(err) {
            res.send(err);
        }
        res.json(task);
    });
});

// Update Task (UPDATE)
router.put('/task/:id', function(req, res, next) {
    let task = req.body;
    let updatedTask = {};
    if(task.isDone) {
        updatedTask.isDone = task.isDone;
    }

    if(task.title) {
        updatedTask.title = task.title;
    }

    if(!updatedTask){
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updatedTask, {}, 
            function(err, task) {
            if(err) {
                res.send(err);
            }
            res.json(task);
        });
        
    }
    
});



module.exports = router;