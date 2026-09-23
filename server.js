const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = "8475105096";

app.get("/", (req, res) => {
  res.send("Loan application backend is running.");
});

app.post("/application", async (req, res) => {

  const {
    name,
    phone,
    loanType,
    amount,
    term,
    purpose
  } = req.body;

  console.log("New application:", {
    name,
    phone,
    loanType,
    amount,
    term,
    purpose
  });

  const message =
`🆕 New Loan Application

Name: ${name}
Phone: ${phone}
Loan Type: ${loanType}
Amount: ${amount}
Term: ${term}
Purpose: ${purpose}

Status: Pending Admin Approval`;

  try {

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    if (!telegramResponse.ok) {
      throw new Error("Telegram notification failed");
    }

    res.json({
      success: true,
      status: "pending"
    });

  } catch (error) {

    console.error("Telegram error:", error);

    res.status(500).json({
      success: false,
      error: "Could not send application notification"
    });

  }

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
