const MessageModel = require("../models/messageModel") 

const getAllMessages = (req, res) => {
  MessageModel.getAllMessages((err, results) => {
    if (err) {
      console.error("Greška pri dohvatanju poruka:", err);
      return res.status(500).json({ error: "Greška pri dohvatanju poruka" });
    }
    res.json(results);
  });
};


const addMessage = (req, res) => {
  const { sender, text } = req.body;

  if (!sender || !text) {
    return res.status(400).json({ error: "Nedostaje sender ili text" });
  }

  MessageModel.addMessage(sender, text, (err, result) => {
    if (err) {
      console.error("Greška pri dodavanju poruke:", err);
      return res.status(500).json({ error: "Greška pri dodavanju poruke" });
    }

    res.status(201).json({
      message: "Poruka uspešno dodata",
      id: result.insertId,
      sender,
      text,
      timestamp: new Date(),
    });
  });
};

module.exports = { getAllMessages, addMessage }
