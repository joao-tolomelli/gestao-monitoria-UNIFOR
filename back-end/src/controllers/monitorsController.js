const db = require("../database");
const moment = require("moment");

const monitorsController = {
  async index(req, res) {
    try {
      const result = await db.query(`
        SELECT 
          m.usuario_id,
          m.subject,
          m.institucional,
          u.name,
          u.matricula,
          u.tipo AS tipo_usuario,
          u.photo
        FROM monitores m
        INNER JOIN usuarios u ON m.usuario_id = u.id
      `);

      res.json(result.rows);
    } catch (error) {
      console.error("Erro ao listar monitores:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },



  
  async create(req, res) {
    try {
      const { usuario_id, subject, institucional } = req.body;

      const result = await db.query(`
        INSERT INTO monitores (usuario_id, subject, institucional)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [usuario_id, subject, institucional]);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao criar monitor:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },


  async getHomeInfo(req, res) {
    try {
      const monitorId = req.params.id;
  
      const monitorResult = await db.query(`
        SELECT 
          u.name,
          u.photo,
          m.subject,
          m.institucional
        FROM monitores m
        INNER JOIN usuarios u ON m.usuario_id = u.id
        WHERE m.usuario_id = $1
      `, [monitorId]);
  
      if (monitorResult.rows.length === 0) {
        return res.status(404).json({ message: "Monitor não encontrado" });
      }
  
      const { name, photo, subject, institucional } = monitorResult.rows[0];
  
      const startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD');
      const endOfWeek = moment().endOf('isoWeek').format('YYYY-MM-DD');
  
      const atendimentosResult = await db.query(`
        SELECT date, minutes_worked
        FROM atendimentos
        WHERE id_monitor = $1
        AND date BETWEEN $2 AND $3
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
        const day = moment(att.date).format('dddd');
        const minutos = att.minutes_worked || 0;
        totalMinutosTrabalhados += minutos;
  
        if (workingHours[day] !== undefined) {
          workingHours[day] = (parseInt(workingHours[day]) + minutos).toString();
        }
      });
  
      const horasTrabalhadas = Math.floor(totalMinutosTrabalhados / 60);
      const minutosTrabalhados = totalMinutosTrabalhados % 60;
  
      const today = moment().utcOffset('-03:00').format('dddd');
  
      res.json({
        usuario_id: monitorId,
        name,
        photo,
        subject,
        institucional,
        workingHours,
        total_trabalho: `${horasTrabalhadas}h${minutosTrabalhados > 0 ? ` ${minutosTrabalhados}m` : ""}`,
        today
      });
    } catch (error) {
      console.error("Erro ao buscar dados da Home:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },
  

  async show(req, res) {
    try {
      const monitorId = req.params.id;

      const result = await db.query(`
        SELECT 
          m.usuario_id,
          m.subject,
          m.institucional,
          u.name,
          u.matricula,
          u.tipo AS tipo_usuario,
          u.photo
        FROM monitores m
        INNER JOIN usuarios u ON m.usuario_id = u.id
        WHERE m.usuario_id = $1
      `, [monitorId]);

      if (result.rows.length === 0) {
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
      const monitorId = req.params.id;
      const { subject, institucional } = req.body;

      const result = await db.query(`
        UPDATE monitores
        SET subject = $1, institucional = $2
        WHERE usuario_id = $3
        RETURNING *
      `, [subject, institucional, monitorId]);

      if (result.rows.length === 0) {
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
      const monitorId = req.params.id;

      await db.query(`DELETE FROM monitores WHERE usuario_id = $1`, [monitorId]);

      res.json({ message: "Monitor deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar monitor:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  }
};

module.exports = monitorsController;
