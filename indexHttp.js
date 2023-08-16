// import http from "http";
const http = require("http");
const fs = require("fs");

const PORT = 3004;
const server = http.createServer(async (req, res) => {
  console.log(req.url);
  console.log(req.method);
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, `ok`);
    res.write(`<h1>Hello, World!</h1>`);
    res.end();
  } else if (req.url === "/users") {
    if (req.method === "GET") {
      // JSON.parse digunakan untuk mengconversi json ke object

      const { users } = JSON.parse(fs.readFileSync("./db/db.json"));
      console.log(users);
      res.writeHead(200, "ok");
      // JSON.stringify untuk mengconversi json ke string(tetapi berformat object)
      res.write(JSON.stringify(users));
      res.end();
    }
  }
  // define your route here ...
});

server.listen(PORT, () => {
  console.log(`server started on port : ${PORT}`);
});
