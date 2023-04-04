const { db, Campus, Student } = require("./server/db");
const { Campuses, Students } = require("./seedData");

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      Campuses.map((campus) => {
        return Campus.create(campus);
      })
    );

    await Promise.all(
      Students.map((student) => {
        return Student.create(student);
      })
    );

    console.log("Seeding of student/campus successful");
    db.close();
  } catch (err) {
    console.error(err);
    db.close();
  }
};

syncAndSeed();
