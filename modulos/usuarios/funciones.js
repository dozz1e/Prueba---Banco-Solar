const url = require("url");
const {
  insertarUsuario,
  listarUsuarios,
  editarUsuario,
  eliminarUsuario,
} = require("./index");

const nuevoUsuario = (req, res, pool) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    const cancion = Object.values(JSON.parse(body));
    const codigo = await insertarUsuario(cancion, pool);
    codigo ? (res.statusCode = 201) : (res.statusCode = codigo);
    res.end();
  });
};

const listadoUsuarios = async (res, pool) => {
  const registros = await listarUsuarios(pool);
  registros ? (res.statusCode = 200) : (res.statusCode = 404);
  res.end(JSON.stringify(registros.rows));
};

const actualizarUsuario = (req, res, pool) => {
  const params = url.parse(req.url, true).query;
  const id = params.id;
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    const cancion = Object.values(JSON.parse(body));
    const codigo = await editarUsuario(cancion, id, pool);
    if (codigo > 0) {
      res.statusCode = 200;
      texto = "Registro editado con éxito!";
    } else {
      res.statusCode = 400;
      texto = "Hubo problemas para eliminar el registro";
    }
    res.end(console.log(texto));
  });
};

const borrarUsuario = async (req, res, pool) => {
  const params = url.parse(req.url, true).query;
  const id = params.id;
  const codigo = await eliminarUsuario(id, pool);
  let texto = "";
  if (codigo > 0) {
    res.statusCode = 200;
    texto = "Registro eliminado con éxito!";
  } else {
    res.statusCode = 400;
    texto = "Hubo problemas para eliminar el registro";
  }
  res.end(console.log(texto));
};

module.exports = {
  nuevoUsuario,
  listadoUsuarios,
  actualizarUsuario,
  borrarUsuario,
};
