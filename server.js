const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Loan application backend is running.");
});

app.post("/application", (req, res) => {
  const { name, phone, loanType, amount, term, purpose } = req.body;

  console.log("New application:", {
    name,
    phone,
    loanType,
    amount,
    term,
    purpose
  });

  res.json({
    success: true,
    status: "pending"
  });
});

app.post("/message", (req, res) => {
  res.json({
    success: true,
    status: "received"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
