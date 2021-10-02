// Función para crear transferencia en bbdd
const insertarTransferencia = async (datos, pool) => {
  try {
    const client = await pool.connect();
    const ahora = new Date();
    let visual = true;
    try {
      await client.query("BEGIN");
      let consulta = {
        text: "INSERT INTO transferencias (emisor,receptor,monto,fecha) values ($1,$2,$3,$4) RETURNING *;",
        values: [...datos, ahora.toISOString()],
      };
      await client.query(consulta); // Creación de transferencia
      const resp = await client.query(
        `SELECT balance FROM usuarios WHERE id = ${datos[0]};`
      ); // Buscar emisor de la transferencia
      if (resp.rows[0].balance >= datos[2]) {
        await client.query(
          `UPDATE usuarios SET balance = ${
            resp.rows[0].balance - datos[2]
          } WHERE id = ${datos[0]} RETURNING *;`
        ); // Actualización de balance de emisor
        const receptor = await client.query(
          `SELECT balance FROM usuarios WHERE id = ${datos[1]};`
        ); // Buscar receptor de la transferencia
        await client.query(
          `UPDATE usuarios SET balance = ${
            receptor.rows[0].balance + datos[2]
          } WHERE id = ${datos[1]} RETURNING *;`
        ); // Actualización de balance de receptor
        await client.query("COMMIT");
      } else {
        await client.query("ROLLBACK");
        visual = false;
        console.log("El monto supera al balance del usuario.");
      }
      return visual;
    } catch (e) {
      await client.query("ROLLBACK");
      return false;
    } finally {
      client.release();
    }
  } catch (e) {
    (e) => console.error(e.stack);
  }
};

// Función para obtener todas las transferencias en bbdd
const listarTransferencia = async (pool) => {
  try {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      let consulta = {
        text: "SELECT * FROM transferencias;",
        rowMode: "array",
      };
      const result = await client.query(consulta); // Consulta de transferencias
      const usuarios = await client.query("SELECT id, nombre FROM usuarios;"); // Obtener nombres de usuarios
      let resultado = [],
        emi = "",
        recp = "";
      result.rows.forEach((r) => {
        usuarios.rows.forEach((u) => {
          if (u.id == r[1]) emi = u.nombre;
          if (u.id == r[2]) recp = u.nombre;
        });
        resultado.push([r[0], emi, recp, r[3], r[4]]); // Cambio de ids por los nombres a mostrar
      });
      await client.query("COMMIT");
      return resultado;
    } catch (error) {
      await client.query("ROLLBACK");
      console.log(error.code);
      return false;
    } finally {
      client.release();
    }
  } catch (e) {
    (e) => console.error(e.stack);
  }
};

module.exports = {
  insertarTransferencia,
  listarTransferencia,
};
