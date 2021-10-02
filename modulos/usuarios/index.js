const insertarUsuario = async (datos, pool) => {
  const consulta = {
    text: "INSERT INTO usuarios (nombre,balance) values ($1,$2) RETURNING *;",
    values: datos,
    rowMode: "array",
  };
  try {
    await pool.query(consulta);
    return true;
  } catch (error) {
    console.log(error.code);
    return error;
  }
};

const listarUsuarios = async (pool) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios ORDER BY id DESC;");
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const editarUsuario = async (datos, id, pool) => {
  try {
    const consulta = {
      text: "UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *;",
      values: [...datos, id],
    };
    const result = await pool.query(consulta);
    return result.rowCount;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const eliminarUsuario = async (datos, pool) => {
  try {
    let consulta = {
      text: "DELETE FROM transferencias WHERE emisor = $1 OR receptor = $1 RETURNING *;",
      values: [datos],
    };
    let result = await pool.query(consulta);
    if (result.rowCount > 0) {
      consulta = {
        text: "DELETE FROM usuarios WHERE id = $1 RETURNING *;",
        values: [datos],
      };
      result = await pool.query(consulta);
      return result.rowCount;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error.code);
    return error;
  }
};

module.exports = {
  insertarUsuario,
  listarUsuarios,
  editarUsuario,
  eliminarUsuario,
};
