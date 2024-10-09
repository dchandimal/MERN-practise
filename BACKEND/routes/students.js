const router = require("express").Router();
let Student = require("../models/Student");

//if call http//localhost:8070/student/add backend URL, will redirect to inserting a user
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;

  const newStudent = new Student({
    name,
    age,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//to view the users (http//localhost:8070/student/)
router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

//to update a user (http//localhost:8070/student/update/45fed34few)
// below thing is implemented using destructure way, it is good comparing to above way

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  //below line is about destructuring
  const { name, age, gender } = req.body;

  const updateStudent = {
    name,
    age,
    gender,
  };

  const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
      res.status(200).send({ status: "User Updated", user: update });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

module.exports = router;
