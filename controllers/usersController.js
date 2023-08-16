const fs = require("fs");

module.exports = {
  getUsers: (req, res) => {
    // didsini users di destructuring karena agar
    // data yang terkirim hanya category users
    const { users } = JSON.parse(fs.readFileSync("./../db/db.json"));
    res.send(users);
  },
};
