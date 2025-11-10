import db from "../config/db.js"; 

const MessageModel = {
  
  getAllMessages: (callback) => {
    const sql = "SELECT * FROM messages ORDER BY timestamp ASC";
    db.query(sql, callback);
  },


  addMessage: (sender, text, callback) => {
    const sql = "INSERT INTO messages (sender, text) VALUES (?, ?)";
    db.query(sql, [sender, text], callback);
  }
};

export default MessageModel;
