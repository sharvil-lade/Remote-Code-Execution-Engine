const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const Schema = mongoose.Schema;

const testCaseSchema = new Schema({
  input: String,
  output: String,
});

const TestCase = mongoose.model("TestCase", testCaseSchema);

const questionTestCaseSchema = new Schema({
  questionID: String,
  testCases: [testCaseSchema],
});

const QuestionTestCase = mongoose.model(
  "QuestionTestCase",
  questionTestCaseSchema
);

app.post("/:quesID", async (req, res) => {
  const testcase = new TestCase({
    input: req.body.inputSRC.toString(),
    output: req.body.outputSRC.toString(),
  });

  try {
    const data = await QuestionTestCase.findOne({
      questionID: req.params.quesID,
    });

    if (!data) {
      const newTestCase = new QuestionTestCase({
        questionID: req.params.quesID,
        testCases: [testcase],
      });
      await newTestCase.save();
    } else {
      await QuestionTestCase.updateOne(
        { questionID: req.params.quesID },
        { $push: { testCases: testcase } }
      );
    }
    res.send("Updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const server = app.listen(process.env.PORT || 3000, async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/OnlineJudgeDataBase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Server is listening on port ${server.address().port}`);
  } catch (error) {
    console.error("Database connection error:", error);
  }
});