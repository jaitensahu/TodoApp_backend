const readLine = require("readline");
const fs = require("fs");
const { log } = require("console");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getInput = () => {
  let show =
    "Please Select What you want to do...\n 1. Add New Task \n 2. view Task \n 3. Mark Task As complete \n 4. Remove Task \n 5. Exit\n";
  rl.question(show, (input) => {
    let userInp = parseInt(input);
    console.log(userInp);
    switch (userInp) {
      case 1:
        console.log(" selected 1");
        addNewTask();
        getInput();
        break;
      case 2:
        console.log(" selected 2");
        viewTask();
        getInput();
        break;
      case 3:
        console.log(" selected 3");
        getInput();
        markComplete();
        break;
      case 4:
        console.log(" selected 4");
        removeTask();
        getInput();
        break;
      case 5:
        console.log(" selected 5");
        process.exit();
      default:
        console.log("Please select valid number");
        getInput();
    }
  });
};
getInput();

