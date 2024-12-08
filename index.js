#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import fs from "fs";
import path from "path";

program.version("1.0.0").description("Task Tracker CLI");

function initializeJSONStore() {
  if (!fs.existsSync(path.join(process.cwd(), "task-list.json"))) {
    // Create a default JSON file
    const defaultData = {
      "task-list": [],
    };
    fs.writeFileSync(
      path.join(process.cwd(), "task-list.json"),
      JSON.stringify(defaultData, null, 2)
    );
    console.log(chalk.yellow("JSON store initialized"));
  }
}

initializeJSONStore();

const taskList = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "task-list.json"), "utf-8")
);

program
  .command("list [taskStatus]")
  .description("Listing all tasks (or with a particular status)")
  .action((taskStatus) => {
    if (taskStatus) {
      console.log(
        taskList["task-list"].filter((task) => task.status === taskStatus)
      );
    } else {
      console.log(taskList);
    }
  });

program
  .command("add <task>")
  .description("Adding a new task")
  .action((task) => {
    const newTaskId =
      taskList["task-list"].length > 0
        ? taskList["task-list"].slice(-1)[0].id + 1
        : 1;
    const newTask = {
      id: newTaskId,
      description: task,
      status: "todo",
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
    taskList["task-list"].push(newTask);
    fs.writeFileSync(
      path.join(process.cwd(), "task-list.json"),
      JSON.stringify(taskList, null, 2)
    );
    console.log(chalk.green(`Task added successfully (ID: ${newTaskId})`));
  });

program
  .command("update <id> <task>")
  .description("Updating a task")
  .action((id, task) => {
    taskList["task-list"][parseInt(id) - 1].description = task;
    taskList["task-list"][parseInt(id) - 1].updatedAt =
      new Date().toLocaleString();
    fs.writeFileSync(
      path.join(process.cwd(), "task-list.json"),
      JSON.stringify(taskList, null, 2)
    );
  });

program
  .command("delete <id>")
  .description("Deleting a task")
  .action((id) => {
    taskList["task-list"].splice(parseInt(id) - 1, 1);
    fs.writeFileSync(
      path.join(process.cwd(), "task-list.json"),
      JSON.stringify(taskList, null, 2)
    );
  });

program
  .command("mark-in-progress <id>")
  .description("Mark the status as in progress for a task")
  .action((id) => {
    taskList["task-list"][parseInt(id) - 1].status = "in-progress";
    taskList["task-list"][parseInt(id) - 1].updatedAt =
      new Date().toLocaleString();
    fs.writeFileSync(
      path.join(process.cwd(), "task-list.json"),
      JSON.stringify(taskList, null, 2)
    );
  });

program
  .command("mark-done <id>")
  .description("Mark the status as done for a task")
  .action((id) => {
    taskList["task-list"][parseInt(id) - 1].status = "done";
    taskList["task-list"][parseInt(id) - 1].updatedAt =
      new Date().toLocaleString();
    fs.writeFileSync(
      path.join(process.cwd(), "task-list.json"),
      JSON.stringify(taskList, null, 2)
    );
  });

program.parse(process.argv);
