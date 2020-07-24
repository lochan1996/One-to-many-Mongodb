const Todo = require("../models/Todo");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const User = require("../models/user");


/*exports.getTodosId = (req, res, next, id) => {
    Todo.findById(id).exec((err, todoid) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found in DB"
            });
        }
        req.todoid = todoid;
        next();
    })
}*/

exports.getTodos = (req, res) => {
    Todo.find(function (err, todos)  {
        if(err) {
            return res.status(400).json({
                error: "NO TODO found"
            })
        }
        else {
            res.json(todos)
        }

    })
        }

exports.getUsertodos = (req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (err) {
            return res.status(400).json({
                error: "List not found"
            })
        }
        else {
            return res.json(todo)
        }
    })
}

exports.addUsertodos = async(req, res) => {

    let {
        todo_desc,
        todo_heading,
        todo_priority,
        todo_completed
    } = req.body;
    try {

        let user = await User.findOne()
        //return res.json(user)
        let todo = await Todo.create({
            todo_desc,
            todo_completed,
            todo_priority,
            todo_heading,
            user: user._id
        })
        res.json({
            message: 'todo created successfully',
            todo
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Unable to create a todo',
            err: JSON.stringify(err)
        })
    }

};

    /*let todo = new Todo(req.body)
    todo.save((err, todo) => {
        if (err) {
            return res.status(400).json({
                error: "not saved"
            })
        }
        else {
            return res.json(todo)
        }
    })*/
/*}*/

exports.updateTodos = (req, res) => {
    Todo.update(
        { _id: req.params.id },
        {
            $set: {
                todo_heading : req.body.todo_heading,
                todo_desc : req.body.todo_desc,
                todo_priority : req.body.todo_priority,
                todo_completed : req.body.todo_completed
            }
        }, (err, updatetodo) => {
            if (err) {
                return res.status(400).json({
                    error: "not updated"
                })
            }
            else {
                res.json(updatetodo)
            }
        }
    )
}
    /*Todo.findById(req.params.id, (err, todo) => {
        if (err || !todo) {
            return res.status(400).json({
                error: "not updated"
            })
        }
        else {
           *//* todo_heading = req.body.todo_heading

            return res.json({
                todo_heading
            })*//*

             todo_heading = req.body.todo_heading,
                 todo_desc = req.body.todo_desc,
                 todo_priority = req.body.todo_priority,
                 todo_completed = req.body.todo_completed
        }
        Todo.save((err, todo) => {
            if (err) {
                return res.status(400).json({
                    error: "not updated"
                })
            }
            else {
                return res.json(todo)
            }
        })*/

        /*.then(todo => {
            res.json('todo updated')
        }).catch(err => {
            res.status(400).send("update not possible")
        })*/
    /*})
    }*/
