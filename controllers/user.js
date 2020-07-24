const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User was not found"
            })
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

exports.getAllUsers = async(req, res) => {
    let {
        id
    } = req.params;

    try {
        let user = await User.find().populate('todos');
        console.log("user: ", JSON.stringify(user));
        if (_.isEmpty(user)) {
            res.status(500).json({
                message: 'unable to find user'
            })
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: 'unable to find user',
            err: JSON.stringify(err)
        })
    }
}

   /* User.find().exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User was not found"
            })
        }
        return res.json(user)
    });*/
/*}*/

exports.getRegUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            res.json(err)
        }
        res.json(users)
    })
}

exports.addToDoUser = async (req, res) => {
    let {
        name,
        todos
    } = req.body;

    try {
        let user = new User();
        user.name = name;
        let objectIds = todos.split(',').map(id => mongoose.Types.ObjectId(id));
        user.todos.push(...objectIds)
        await user.save()
        console.log("user: ", JSON.stringify(user));
        if (_.isEmpty(user)) {
            res.status(500).json({
                message: 'unable to create user empty'
            })
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: 'unable to create user',
            err: JSON.stringify(err)
        })
    }
}


exports.getToDos = (req, res) => {
    User.find({ _id: req.params._id })
        .populate("todos")
        .exec((err, toDo) => {
            if (err) {
                res.json(err)
            }
            res.json(toDo)
        })
}

exports.UpdateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "update not success"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);

        }
    );
};

