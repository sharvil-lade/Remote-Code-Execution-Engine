const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

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

router.post("/:quesID", async (req, res) => {
  const testcase = new TestCase({
    input: req.body.inputSRC.toString(),
    output: req.body.outputSRC.toString(),
  });

  try {
    let questionTest = await QuestionTestCase.findOne({
      questionID: req.params.quesID.toString(),
    });

    if (!questionTest) {
      const newTestCase = new QuestionTestCase({
        questionID: req.params.quesID,
        testCases: [testcase],
      });
      await newTestCase.save();
    } else {
      questionTest.testCases.push(testcase);
      await questionTest.save();
    }
    res.send("Updated");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:quesID/:testCaseNumber", async (req, res) => {
  const testCaseNumber = parseInt(req.params.testCaseNumber);

  if (testCaseNumber <= 0) {
    return res
      .status(400)
      .send("Invalid Request: Invalid TestCase Number requested");
  }

  try {
    const questionTest = await QuestionTestCase.findOne({
      questionID: req.params.quesID,
    });

    if (!questionTest) {
      return res.status(404).send("Invalid Request: Question Code Not Found");
    }

    if (testCaseNumber > questionTest.testCases.length) {
      return res
        .status(400)
        .send("Invalid Request: TestCase Number out of bounds");
    }

    const requiredTestCase = questionTest.testCases[testCaseNumber - 1];
    res.json({
      inputSRC: requiredTestCase.input,
      outputSRC: requiredTestCase.output,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;