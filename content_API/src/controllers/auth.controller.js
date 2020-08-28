const db = require("../models/Content_sequelize");
const config = require("../dbconfig/auth.config");
const User = db.pf_users;
const Role = db.pf_roles;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  // Save User to Database
  // console.log(req)
  User.pf_users.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then( users => {
      // console.log('Aqui', User)
      if (req.body.roles) {
        Role.pf_roles.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        });
        // .then(roles => {
        //   // console.log('Users',users)
        //   // console.log('Aquiiii', roles);
        //   users.setPf_roles(roles).then(() => {
        //     res.send({ message: "User was registered successfully!" });
        //   });
        // });
      } else {
          // console.log(users)
          users.setPf_roles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.pf_users.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(users => {
      if (!users) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        users.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: users.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      users.getPf_roles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: users.id,
          username: users.username,
          email: users.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};