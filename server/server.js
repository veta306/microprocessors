import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import query from "./db/index.js";

const app = express();

app.use(cors());
app.use(json());

app.get("/api/microprocessors", async (req, res) => {
  try {
    const Microprocessors = await query("select * from Microprocessors");
    res.status(200).json({
      status: "success",
      results: Microprocessors.rows.length,
      data: Microprocessors.rows,
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/manufacturers", async (req, res) => {
  try {
    const Manufacturers = await query("select * from Manufacturers");
    res.status(200).json({
      status: "success",
      results: Manufacturers.rows.length,
      data: Manufacturers.rows,
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/types", async (req, res) => {
  try {
    const Types = await query("select * from Types");
    res.status(200).json({
      status: "success",
      results: Types.rows.length,
      data: Types.rows,
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/sockets", async (req, res) => {
  try {
    const Sockets = await query("select * from Sockets");
    res.status(200).json({
      status: "success",
      results: Sockets.rows.length,
      data: Sockets.rows,
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/reviews", async (req, res) => {
  try {
    const Reviews = await query("select * from Reviews");
    res.status(200).json({
      status: "success",
      results: Reviews.rows.length,
      data: Reviews.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/processor", async (req, res) => {
  const { id } = req.query;
  try {
    const Processor = await query(
      `SELECT 
      microprocessors.*, 
      manufacturers.name AS manufacturer_name, 
      types.name AS type_name, 
      sockets.name AS socket_name, 
      igpus.model AS igpu_model,
      igpus.base_clock AS igpu_base_clock,
      igpus.boost_clock AS igpu_boost_clock,
      igpus.flops AS igpu_flops
    FROM 
      microprocessors 
    LEFT JOIN 
      manufacturers ON microprocessors.manufacturer_id = manufacturers.manufacturer_id
    LEFT JOIN 
      types ON microprocessors.type_id = types.type_id
    LEFT JOIN 
      sockets ON microprocessors.socket_id = sockets.socket_id
    LEFT JOIN 
      igpus ON microprocessors.igpu_id = igpus.igpu_id
    WHERE 
      microprocessor_id = ${id}`
    );
    res.status(200).json({
      status: "success",
      data: Processor.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/review", async (req, res) => {
  const { id } = req.query;
  try {
    const Reviews = await query(
      `select * from reviews where microprocessor_id = ${id}`
    );
    res.status(200).json({
      status: "success",
      results: Reviews.rows.length,
      data: Reviews.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/processor", async (req, res) => {
  const {
    model,
    manufacturer_name,
    igpu_name,
    igpu_base_clock,
    igpu_boost_clock,
    igpu_flops,
    type_name,
    socket_name,
    cores,
    threads,
    base_clock,
    boost_clock,
    process,
    tdp,
    released,
  } = req.body;
  try {
    let queryText;
    if (igpu_name) {
      queryText =
        "INSERT INTO microprocessors (model, manufacturer_id, igpu_id, type_id, socket_id, cores, threads, base_clock, boost_clock, process, tdp, released) VALUES ($1, (SELECT get_or_insert_manufacturer($2)), (SELECT get_or_insert_igpu($3, $4, $5, $6)),(SELECT get_type_id($7)),(SELECT get_or_insert_socket($8)), $9, $10, $11, $12, $13, $14, $15)";
      await query(queryText, [
        model,
        manufacturer_name,
        igpu_name,
        igpu_base_clock,
        igpu_boost_clock,
        igpu_flops,
        type_name,
        socket_name,
        cores,
        threads,
        base_clock,
        boost_clock,
        process,
        tdp,
        released,
      ]);
    } else {
      queryText =
        "INSERT INTO microprocessors (model, manufacturer_id, type_id, socket_id, cores, threads, base_clock, boost_clock, process, tdp, released) VALUES ($1, (SELECT get_or_insert_manufacturer($2)), (SELECT get_type_id($3)),(SELECT get_or_insert_socket($4)), $5, $6, $7, $8, $9, $10, $11)";
      await query(queryText, [
        model,
        manufacturer_name,
        type_name,
        socket_name,
        cores,
        threads,
        base_clock,
        boost_clock,
        process,
        tdp,
        released,
      ]);
    }
    res.send("Processor added successfully!");
  } catch (err) {
    console.error("Error adding processor:", err);
    res.status(500).send("err");
  }
});

app.delete("/api/processor", async (req, res) => {
  const { id } = req.query;
  try {
    await query(`delete from microprocessors where microprocessor_id = ${id}`);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.patch("/api/processor", async (req, res) => {
  const {
    model,
    manufacturer_name,
    igpu_name,
    igpu_base_clock,
    igpu_boost_clock,
    igpu_flops,
    type_name,
    socket_name,
    cores,
    threads,
    base_clock,
    boost_clock,
    process,
    tdp,
    released,
    microprocessor_id,
  } = req.body;
  try {
    let queryText;
    if (igpu_name) {
      queryText =
        "UPDATE Microprocessors SET model = $1, manufacturer_id = (SELECT get_or_insert_manufacturer($2)), igpu_id = (SELECT get_or_insert_igpu($3, $4, $5, $6)), type_id = (SELECT get_type_id($7)), socket_id = (SELECT get_or_insert_socket($8)), cores = $9, threads = $10, base_clock = $11, boost_clock = $12, process = $13, tdp = $14, released = $15 WHERE microprocessor_id = $16";
      await query(queryText, [
        model,
        manufacturer_name,
        igpu_name,
        igpu_base_clock,
        igpu_boost_clock,
        igpu_flops,
        type_name,
        socket_name,
        cores,
        threads,
        base_clock,
        boost_clock,
        process,
        tdp,
        released,
        microprocessor_id,
      ]);
    } else {
      queryText =
        "UPDATE Microprocessors SET model = $1, manufacturer_id = (SELECT get_or_insert_manufacturer($2)), igpu_id = NULL, type_id = (SELECT get_type_id($3)), socket_id = (SELECT get_or_insert_socket($4)), cores = $5, threads = $6, base_clock = $7, boost_clock = $8, process = $9, tdp = $10, released = $11 WHERE microprocessor_id = $12";
      await query(queryText, [
        model,
        manufacturer_name,
        type_name,
        socket_name,
        cores,
        threads,
        base_clock,
        boost_clock,
        process,
        tdp,
        released,
        microprocessor_id,
      ]);
    }
    res.send("Processor added successfully!");
  } catch (err) {
    console.error("Error adding processor:", err);
    res.status(500).send("err");
  }
});

app.get("/api/search", async (req, res) => {
  const { searchQuery } = req.query;
  try {
    let results;
    if (searchQuery) {
      const queryText = "SELECT * FROM Microprocessors WHERE model ILIKE $1";
      const queryParams = [`%${searchQuery}%`];
      results = await query(queryText, queryParams);
    } else results = await query("select * from Microprocessors");
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
  } catch (err) {
    console.error("Error adding processor:", err);
    res.status(500).send("err");
  }
});

app.get("/api/filter", async (req, res) => {
  const { manufacturers, sockets, types } = req.query;
  try {
    const conditions = [];
    const params = [];
    let index = 1;
    manufacturers?.map((manufacturer) => {
      conditions.push(
        `manufacturer_id = get_or_insert_manufacturer($${index++})`
      );
      params.push(manufacturer);
    });
    sockets?.map((socket) => {
      conditions.push(`socket_id = get_or_insert_socket($${index++})`);
      params.push(socket);
    });
    types?.map((type) => {
      conditions.push(`type_id = get_type_id($${index++})`);
      params.push(type);
    });
    let queryText = "SELECT * FROM Microprocessors";
    if (conditions.length > 0) {
      queryText += " WHERE " + conditions.join(" OR ");
    }
    const results = await query(queryText, params);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Filter Error");
  }
});

app.post("/api/review", async (req, res) => {
  const { id, rating } = req.body;
  try {
    const Reviews = await query(
      `select * from reviews where microprocessor_id = ${id}`
    );
    if (Reviews.rowCount > 0) {
      await query(
        "update reviews set rating = $1 where microprocessor_id = $2",
        [rating, id]
      );
    } else
      await query(
        "insert into reviews (microprocessor_id, rating) values ($1, $2)",
        [id, rating]
      );
    res.status(200).json({
      status: "success",
      results: Reviews.rows.length,
      data: Reviews.rows,
    });
  } catch (err) {
    console.log(err);
  }
});
app.delete("/api/review", async (req, res) => {
  const { id } = req.query;
  try {
    const Reviews = await query(
      `delete from reviews where microprocessor_id = ${id}`
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});
app.delete("/api/category", async (req, res) => {
  const { category, name } = req.query;
  try {
    await query(`DELETE FROM ${category} WHERE name = '${name}'`);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
