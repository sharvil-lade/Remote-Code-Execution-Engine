# Remote Code Execution Engine

This API is a robust, scalable remote code execution engine designed for online coding platforms. It securely runs code submissions in a sandboxed environment, evaluates them against pre-defined test cases, and provides instant feedback on performance and correctness. The API leverages modern technologies like RabbitMQ for efficient task queuing, Redis for rapid result caching, and Docker for isolated execution.

## Supported Languages

The API currently supports code submissions in:

- C
- C++
- Python 3

### Pre-requisites

Ensure the following services are up and running before starting the API:

- **[RabbitMQ](https://www.rabbitmq.com/download.html)** - For managing the queuing of code submissions.
- **[Redis](https://redis.io/download)** - For caching results to improve response times.
- **[MongoDB](https://docs.mongodb.com/manual/installation/)** - For storing and managing test cases.
- **[Docker](https://docs.docker.com/engine/install/)** - For running code in a secure, isolated environment.

## Installation

### Clone the Repository

Clone the repository using the following command:

```
git clone https://github.com/sharvil-lade/Remote-Code-Execution-Engine.git
```

### Run the Server

```
node Server/server.js
```

### Run The Judge

```
node Judge/config/rabbitMQ.js
```

### Why Message Queueing?

The challenge lies in handling submissions at scale. While the API can handle small-scale operations (10-15 submissions simultaneously) without queuing, scaling up requires a robust solution to manage higher loads. Rate limiting could address this, but it introduces unfair delays in competitive environments. By using message queuing, submissions are handled asynchronously, ensuring fairness and reliability even under heavy load.

### Why Docker?

Security is paramount when running untrusted code. Docker provides a controlled environment that isolates each code execution. If a user attempts to run malicious code—such as a fork bomb or rm -rf command—Docker's containerization ensures the broader system remains unaffected. This isolation is crucial for maintaining the integrity and security of the hosting environment.

### API Documentation: [Postman](https://documenter.getpostman.com/view/32039866/2sAXxPACxG)

### How to Use:

All requests must include the following header:

```
{"Content-type" : "application/json"}
```

To add a test case for a specific question, send a POST request to:

```
http://localhost:3000/testCase/:questionID
```

Where `:questionID` is the unique ID of the question.

The Body for Posting Testcases should be in the following format:

```
{
  inputSRC : "Input of the respective testcase"
  outputSRC : "Expected output for the above input"
}
```

To delete all test cases for a specific question, send a DELETE request to:

```
http://localhost:3000/testCase/delete-all/:questionID
```

To retrieve a specific test case, send a GET request to:

```
http://localhost:3000/testCase/:questionID/:testcaseNumber
```

Where `:testcaseNumber` is the index of the desired test case.

Although the Testcases are posted individually, a submitted program will be tested against all the testcases.

To submit a code solution, send a POST request to:

```
http://localhost:3000/submit/
```

The body of the Post should include:

```
{
  questionID: "Question ID of the question for whom the submission is supposed to be"
  language: "Language Code of the Submission as per given below"
  timeOut: "Time Limit for Execution"
  src: "Source code of Submission"
}
```

The language Code of the languages are given below:

- C: 'C'
- C++: 'C++'
- Python: 'python3'

When Successfully Queued, the API Sends the Following response:

```
{
  status: "InQueue"
  submissionID: "The submission ID assigned by the API to the respective submission"
}
```

To check the status of a submission, send a GET request to:

```
http://localhost:3000/result/:submissionID
```

Where `:submissionID` is the ID assigned during submission.

The following responses indicate the outcome of a submission:

- AC: All Correct
- WA: Wrong Answer
- CE: Compilation Error
- timeOut: Time Limit Exceeded

### Applications

- Online Coding Contests
- Technical Interviews
- Online Assesments and Coding Tests

### Built With

- [Express](https://expressjs.com/) - The web framework used.
- [RabbitMQ](https://www.rabbitmq.com/) - Used for Message Queueing.
- [MongoDB](https://www.mongodb.com/) - Database for testcases.
- [Redis](https://redis.io/) - Used for caching the results.
- [Docker](https://www.docker.com/) - Used for Running the Program in a secure Environment.
- [NodeJS](https://nodejs.org/en/) - Used as the js runtime.

### Acknowledgements:

- [https://www.youtube.com/watch?v=eg0nlYcbLpo](https://www.youtube.com/watch?v=eg0nlYcbLpo)
- [https://blog.remoteinterview.io/how-we-used-docker-to-compile-and-run-untrusted-code-2fafbffe2ad5](https://blog.remoteinterview.io/how-we-used-docker-to-compile-and-run-untrusted-code-2fafbffe2ad5)
- [https://medium.com/@yashbudukh/building-a-remote-code-execution-system-9e55c5b248d6](https://medium.com/@yashbudukh/building-a-remote-code-execution-system-9e55c5b248d6)
