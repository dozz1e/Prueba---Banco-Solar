const { insertarTransferencia, listarTransferencia } = require("./index");

const nuevaTransferencia = (req, res, pool) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    const transferencia = Object.values(JSON.parse(body));
    const visual = await insertarTransferencia(transferencia, pool);
    visual ? (res.statusCode = 201) : (res.statusCode = 500);
    res.end();
  });
};

const listaTransferencia = async (res, pool) => {
  const registros = await listarTransferencia(pool);
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
