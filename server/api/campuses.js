const router = require("express").Router();
const { Campus, Student } = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    res.send(await Campus.findByPk(req.params.id, { include: Student }));
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Campus.create(req.body));
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.send(await Campus.findAll({ include: Student }));
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    res.send(await campus.update(req.body));
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);

    res.send(await campus.destroy());
  } catch (e) {
    next(e);
  }
});

module.exports = router;
