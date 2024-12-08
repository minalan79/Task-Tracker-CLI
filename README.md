# TaskList CLI

TaskList CLI is a simple and efficient command-line application to manage your tasks and to-do lists.

## Features

- Add new tasks
- List tasks by status
- Mark tasks as done or in-progress
- update tasks
- Delete tasks

## Installation

To install the TaskList CLI, use npm:

```bash
npm i
npm link
```
## Usage
### Add a Task
```bash
task-cli add "Buy groceries"
```
### List All Tasks
```bash
tasklist list
```
### List Tasks by Status
```bash
tasklist list [status]
```
### Mark a Task as Done or In-progress
```bash
tasklist mark-done <task_id>
tasklist mark-in-progress <task_id>
```
### Delete a Task
```bash
tasklist delete <task_id>
```

## Project URL
https://roadmap.sh/projects/task-tracker

## License
This project is licensed under the MIT License. See the LICENSE file for details.
