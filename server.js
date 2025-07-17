 const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let students = [
  { id: 1, name: "Asad", course: "Node.js" },
  { id: 2, name: "Omair", course: "Python" }
];


app.get("/students", (req, res) => {
  res.json(students);
});


app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

app.post("/students", (req, res) => {
  const { name, course } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    course
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});


app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ message: "Student not found" });

  const { name, course } = req.body;
  student.name = name || student.name;
  student.course = course || student.course;

  res.json(student);
});

app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ message: "Student not found" });

  students.splice(index, 1);
  res.json({ message: "Student deleted" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
