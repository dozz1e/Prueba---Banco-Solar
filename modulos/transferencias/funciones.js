const { insertarTransferencia, listarTransferencia } = require("./index");

// Función para crear una transferencia
const nuevaTransferencia = (req, res, pool) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    const transferencia = Object.values(JSON.parse(body));
    const visual = await insertarTransferencia(transferencia, pool); // Función para insertar en bbdd
    visual ? (res.statusCode = 201) : (res.statusCode = 500);
    res.end();
  });
};

// Función para mostrar listado de transferencias
const listaTransferencia = async (res, pool) => {
  const registros = await listarTransferencia(pool); // Listado desde bbdd
  if (registros) {
    res.statusCode = 200;
    res.end(JSON.stringify(registros));
  } else {
    res.statusCode = 500;
    res.end();
  }
};

module.exports = {
  nuevaTransferencia,
  listaTransferencia,
};
