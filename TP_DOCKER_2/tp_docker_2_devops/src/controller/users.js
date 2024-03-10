const userService = require('../services/users');
const createError = require('http-errors');

exports.getUsers = async (req, res) => {
   const users = await userService.getUsers();
   res.json({success: true, data: users});
}

exports.getUserById = async (req, res, next) => {
   let userId = parseInt(req.params.id); // We are sure here by using validator that we have a valid number, we can parseInt
   const user = await userService.getUserById(userId);
   if (user) {
      res.json({success: true, data: user});
   } else {
      next(createError(404, "no user found for this id"));
   }
}

exports.addUser = async (req, res, next) => {
   if (req.body && req.body.username && req.body.fullName) {
      const userCreated = await userService.addUser(req.body.username, req.body.fullName);
      if (userCreated) {
         res.status(201).json({success: true, id: userCreated.id});
      } else {
         next(createError(400, "Error when creating this user, verify your args"));
      }
   } else {
      next(createError(400, "Cannot add this user, make sure all args has been sent"));
   }
}