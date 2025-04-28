const db = require("../database");
const moment = require("moment");

const monitorsController = {
  
  async index(req, res) {
    try {
      const monitoresResult = await db.query(`
        SELECT 
          m.usuario_id,
          m.tipo_monitoria,
          m.carga_horaria_exigida,
          u.nome,
          u.matricula,
          u.tipo AS tipo_usuario,
          u.foto_url
        FROM monitores m
        INNER JOIN usuarios u ON m.usuario_id = u.id
        WHERE u.tipo = 'monitor'
      `); // cargar horario -> bool institucional, name, subject, user_id

      res.json(monitoresResult.rows);
    } catch (error) {
      console.error("Erro ao listar monitores:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async getHomeInfo(req, res) {
    try {
      const monitorId = req.params.id;

      const monitorResult = await db.query(`
        SELECT 
          u.nome,
          u.foto_url,
          m.tipo_monitoria,
          m.carga_horaria_exigida
        FROM monitores m
        INNER JOIN usuarios u ON m.usuario_id = u.id
        WHERE m.usuario_id = $1
      `, [monitorId]); //subject, name, photo

      if (monitorResult.rows.length === 0) {
        return res.status(404).json({ message: "Monitor não encontrado" });
      }

      const { nome, foto_url, tipo_monitoria, carga_horaria_exigida } = monitorResult.rows[0];

      const startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD');
      const endOfWeek = moment().endOf('isoWeek').format('YYYY-MM-DD');

      const atendimentosResult = await db.query(`
        SELECT data, horas_trabalhadas
        FROM atendimentos
        WHERE monitor_id = $1
          AND data BETWEEN $2 AND $3
      `, [monitorId, startOfWeek, endOfWeek]);
      

      const workingHours = {
        Monday: "0",
        Tuesday: "0",
        Wednesday: "0",
        Thursday: "0",
        Friday: "0"
      };

      let totalMinutosTrabalhados = 0;

      atendimentosResult.rows.forEach(att => {
        const day = moment(att.data).format('dddd');
        const minutos = att.horas_trabalhadas || 0;
        totalMinutosTrabalhados += minutos;

        if (workingHours[day] !== undefined) {
          workingHours[day] = (parseInt(workingHours[day]) + minutos).toString();
        }
      });

      const horasTrabalhadas = Math.floor(totalMinutosTrabalhados / 60);
      const minutosTrabalhados = totalMinutosTrabalhados % 60;

      const today = moment().format('dddd');

      res.json({
        usuario_id: monitorId,
        nome,
        tipo_monitoria,
        carga_horaria_exigida,
        foto_url,
        workingHours,
        total_trabalho: `${horasTrabalhadas}h${minutosTrabalhados > 0 ? ` ${minutosTrabalhados}m` : ""}`,
        today
      });
    } catch (error) {
      console.error("Erro ao buscar dados da Home:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async create(req, res) {
    try {
      const { usuario_id, tipo_monitoria, carga_horaria_exigida } = req.body;

      if (!usuario_id || !tipo_monitoria || !carga_horaria_exigida) {
        return res.status(400).json({ error: "Campos obrigatórios: usuario_id, tipo_monitoria e carga_horaria_exigida" });
      }

      const result = await db.query(`
        INSERT INTO monitores (usuario_id, tipo_monitoria, carga_horaria_exigida)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [usuario_id, tipo_monitoria, carga_horaria_exigida]);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao criar monitor:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },


  async show(req, res) {
    try {
      const { id } = req.params;

      const result = await db.query(`
        SELECT 
          m.usuario_id,
          m.tipo_monitoria,
          m.carga_horaria_exigida,
          u.nome,
          u.matricula,
          u.tipo AS tipo_usuario,
          u.foto_url
        FROM monitores m
        INNER JOIN usuarios u ON m.usuario_id = u.id
        WHERE m.usuario_id = $1
      `, [id]);

      if (!result.rows.length) {
        return res.status(404).json({ message: "Monitor não encontrado" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao buscar monitor:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { tipo_monitoria, carga_horaria_exigida } = req.body;

      const result = await db.query(`
        UPDATE monitores
        SET tipo_monitoria = $1,
            carga_horaria_exigida = $2
        WHERE usuario_id = $3
        RETURNING *
      `, [tipo_monitoria, carga_horaria_exigida, id]);

      if (!result.rows.length) {
        return res.status(404).json({ message: "Monitor não encontrado" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar monitor:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const result = await db.query(`
        DELETE FROM monitores
        WHERE usuario_id = $1
        RETURNING *
      `, [id]);

      if (!result.rows.length) {
        return res.status(404).json({ message: "Monitor não encontrado" });
      }

      res.json({ message: "Monitor deletado com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar monitor:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  }
};

module.exports = monitorsController;
