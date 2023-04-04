const router = require("express").Router();
const { Student, Campus } = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    res.send(await Student.findByPk(req.params.id, { include: Campus }));
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Student.create(req.body));
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.send(await Student.findAll());
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    res.send(await student.update(req.body));
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);

    res.send(await student.destroy());
  } catch (e) {
    next(e);
  }
});

module.exports = router;
