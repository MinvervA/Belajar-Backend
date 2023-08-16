const express = require("express");
const fs = require("fs");
const PORT = 3005;
const app = express();
app.use(express.json()); // untuk mengambil Data dari Request

app.get("/api", (req, res) => {
  res.send(`hi there, This is Express .js API`);
});

app.get("/users", (req, res) => {
  // fs.readFileSync("LetakPathnya") digunakan untuk membaca db yang akan dikirim datanya
  const users = JSON.parse(fs.readFileSync("./db/db.json"));
  // console.log(users);
  res.send(users);
});

app.post("/users", (req, res) => {
  console.log(req.body); // untuk check hasil data yang diambil dari body
  // 1.ambil data dari req body
  const dataUsers = req.body;
  // 2.ambil data db.json
  const db = JSON.parse(fs.readFileSync("./db/db.json"));
  // 3.Manipulasi (add new data)
  console.log(db.users[0].id);
  const lastId = db.users[db.users.length - 1].id;
  console.log(lastId);
  dataUsers.id = lastId + 1;
  db.users.push(dataUsers);
  // // 4.simpan data db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.send("Register Success");
});

// Register
app.post("/register", (req, res) => {
  console.log(req.body);
  const inputUser = req.body;

  const db = JSON.parse(fs.readFileSync("./db/db.json"));
  let isAlreadyEmail = false;
  // const isAlreadyEmail = false

  db.users.find((value) => {
    if (value.email === inputUser.email) {
      isAlreadyEmail = true;
    }
  });

  if (isAlreadyEmail == true) {
    res.send("email sudah ada");
  } else {
    const lastId = db.users[db.users.length - 1].id;
    inputUser.id = lastId + 1;
    db.users.push(inputUser);
    fs.writeFileSync("./db/db.json", JSON.stringify(db));
    res.send(db);
  }
});

// Login
app.get("/login", (req, res) => {
  // hasil dari req.query adalah sebuah object tolong diingat
  const inputUser = req.query;
  const db = JSON.parse(fs.readFileSync("./db/db.json"));
  let isEmail = false;
  let isPassword = false;

  for (const value of db.users) {
    if (value.email === inputUser.email) {
      isEmail = true;
      if (value.password === inputUser.password) {
        isPassword = true;
        break;
      }
    }
  }

  if (!isEmail) {
    res.send("Email salah");
  } else if (!isPassword) {
    res.send("Passwordnya salah");
  } else if (isEmail && isPassword) {
    res.send("Anda berhasil Login");
  } else {
    res.send("Akun anda tidak ditemukan");
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
