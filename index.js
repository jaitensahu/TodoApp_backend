const readLine = require("readline");
const fs = require("fs");
const { log } = require("console");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const path = "todo.txt";

function addNewTask() {
  fs.readFile(path, (err, data) => {
    let allData = data.toString();
    allTask = allData
      .trim()
      .split("\n")
      .map((ele) => {
        if (ele != "") {
          return ele;
        }
      });
    console.log(allTask, allTask.length);
    rl.question("Add new task...\n", (input) => {
      let newTask = allTask.length  + ". " + input + "-[incomplete]";
      fs.appendFile(path, "\n" + newTask, (err) => {
        if (err) {
          console.log("error caught", err);
          return;
        }
        console.log("Task Added Successfully \n");
        getInput();
      });
    });
  });
}
function viewTask() {
  fs.readFile(path, (err, data) => {
    console.log(data.toString() + "\n");
    getInput();
  });
}

function markComplete() {
  rl.question("Select task number to mark as complete\n", (input) => {
    fs.readFile(path, (err, data) => {
      let allData = data.toString();
      allTask = allData.trim().split("\n");
      let updatedData = allTask.map((element) => {
        if (element.slice(0, 1) == input) {
          return element.split("-")[0] + "- [completed]";
        }
        return element;
      });
      let updated = updatedData.join("\n");
      fs.writeFile(path, updated, (err) => {
        if (err) {
          console.log("caught error", err);
        }
        console.log("Task Marked Successfully\n");
        getInput();
      });
    });
  });
}

function removeTask() {
  fs.readFile(path, (err, data) => {
    let allData = data.toString();
    allTask = allData.trim().split("\n");
    rl.question("Enter number you want to delete", (input) => {
      let filteredData = allTask
        .filter((ele) => ele.slice(0, 1) != input)
        .map((ele, idx) => idx + 1 + ele.split(".")[1]);
      console.log(filteredData);
      fs.writeFile(path, filteredData.join("\n"), (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Task Deleted Successfully\n");
        // getInput();
      });
    });
  });
}

const getInput = () => {
  let show =
    "Please Select What you want to do...\n 1. Add New Task \n 2. view Task \n 3. Mark Task As complete \n 4. Remove Task \n 5. Exit\n";
  rl.question(show, (input) => {
    let userInp = parseInt(input);
    switch (userInp) {
      case 1:
        addNewTask();
        break;
      case 2:
        viewTask();
        // getInput();
        break;
      case 3:
        // getInput();
        markComplete();
        break;
      case 4:
        removeTask();
        // getInput();
        break;
      case 5:
        process.exit();
      default:
        console.log("Please select valid number");
        getInput();
    }
  });
};

getInput();
