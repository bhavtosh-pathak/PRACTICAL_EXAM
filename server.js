const express = require("express");

const app = express();
const PORT = 3000;


app.use(express.json());


let students = [];



app.post("/students", (req, res) => {
  const { id, name, marks } = req.body;

  
  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  if (marks < 0) {
    return res.status(400).json({
      message: "Marks must be greater than or equal to 0"
    });
  }

  const student = {
    id,
    name,
    marks
  };

  students.push(student);

  res.status(201).json({
    message: "Student added successfully",
    student
  });
});



app.get("/students", (req, res) => {
  res.status(200).json(students);
});



app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const { name, marks } = req.body;

  
  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  if (marks < 0) {
    return res.status(400).json({
      message: "Marks must be greater than or equal to 0"
    });
  }

  student.name = name;
  student.marks = marks;

  res.status(200).json({
    message: "Student updated successfully",
    student
  });
});


app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  students.splice(index, 1);

  res.status(200).json({
    message: "Student deleted successfully"
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
