const url = require("url");
const {
  insertarUsuario,
  listarUsuarios,
  editarUsuario,
  eliminarUsuario,
} = require("./index");

// Función para crear usuario
const nuevoUsuario = (req, res, pool) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    const cancion = Object.values(JSON.parse(body));
    const codigo = await insertarUsuario(cancion, pool); // Función para insertar en bbdd
    codigo ? (res.statusCode = 201) : (res.statusCode = codigo);
    res.end();
  });
};

// Función para mostrar listado de usuarios
const listadoUsuarios = async (res, pool) => {
  const registros = await listarUsuarios(pool); // Listado desde bbdd
  registros ? (res.statusCode = 200) : (res.statusCode = 404);
  res.end(JSON.stringify(registros.rows));
};

// Función para actulizar datos de usuario
const actualizarUsuario = (req, res, pool) => {
  const params = url.parse(req.url, true).query; // ID desde url
  const id = params.id;
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    const cancion = Object.values(JSON.parse(body));
    const codigo = await editarUsuario(cancion, id, pool); // Edición de uusario en bbdd
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

// Función para borrar usuario
const borrarUsuario = async (req, res, pool) => {
  const params = url.parse(req.url, true).query;
  const id = params.id;
  const codigo = await eliminarUsuario(id, pool); // Eliminar usuario y trasnferencias de este usuario de bbdd
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
