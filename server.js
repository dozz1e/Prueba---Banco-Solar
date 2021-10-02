const http = require("http");
const fs = require("fs");
const { Pool } = require("pg");

// Conexión
const config = {
  user: "postgres",
  host: "localhost",
  password: "123",
  database: "bancosolar",
  port: 5432,
};

const pool = new Pool(config);

const {
  nuevoUsuario,
  listadoUsuarios,
  actualizarUsuario,
  borrarUsuario,
} = require("./modulos/usuarios/funciones");

const {
  nuevaTransferencia,
  listaTransferencia,
} = require("./modulos/transferencias/funciones");

http
  .createServer((req, res) => {
    // Creación de servidor
    if (req.url == "/" && req.method == "GET") {
      // Página raíz
      res.setHeader("content-type", "text/html");
      res.end(fs.readFileSync("./public/index.html", "utf8"));
    }

    if (req.url == "/favicon.png") {
      // Favicon
      res.end(fs.readFileSync("./public/favicon.png"));
    }

    if (req.url.startsWith("/usuario") && req.method == "POST") {
      // Ruta nuevo usuario
      nuevoUsuario(req, res, pool);
    }

    if (req.url.startsWith("/usuarios") && req.method == "GET") {
      // Ruta listado usuarios
      listadoUsuarios(res, pool);
    }

    if (req.url.startsWith("/usuario") && req.method == "PUT") {
      // Ruta actualizar usuario
      actualizarUsuario(req, res, pool);
    }

    if (req.url.startsWith("/usuario") && req.method == "DELETE") {
      // Ruta borrar usuario
      borrarUsuario(req, res, pool);
    }

    if (req.url.startsWith("/transferencia") && req.method == "POST") {
      // Ruta nueva transferencia
      nuevaTransferencia(req, res, pool);
    }

    if (req.url.startsWith("/transferencias") && req.method == "GET") {
      // Ruta listado de transferencias
      listaTransferencia(res, pool);
    }
  })
  .listen(3000, () => console.log("Servidor ON http://localhost:3000"));
