const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    Q: String,
    answer: [
      {
        a: String,
        bolean: Boolean,
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("question", questionSchema);
