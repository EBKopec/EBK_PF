const bcrypt = require('bcrypt');

let pswrd = bcrypt.hashSync('54321', 9);
console.log(pswrd);