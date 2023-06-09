import { useState, useEffect } from "react";
import "./TaskModal.css";
import Task from "./Task.jsx";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function TaskModal(tasks, uid) {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear().toString();
  const formattedDate = `${day}/${month}/${year}`;

  const [isOpen, setIsOpen] = useState(false);
  const [buttonClass, setButtonClass] = useState("taskClose");
  const [containerClass, setContainerClass] = useState("openContainer");
  const [firstTaskName, setFirstTaskName] = useState("");
  const [firstTaskValue, setFirstTaskValue] = useState("");
  const [firstTaskDate, setFirstTaskDate] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState(formattedDate);

  const [newTasks, setNewTasks] = useState(tasks.tasks);

  useEffect(() => {
    setNewTasks(tasks.tasks);
  }, [tasks.tasks]);

  useEffect(() => {
    if (Object.keys(newTasks).length > 0) {
      if (Object.keys(newTasks)[0].length > 0) {
        const { content, ticked, date } = Object.entries(newTasks)[0][1];

        setFirstTaskName(content);
        setFirstTaskValue(ticked);
        setFirstTaskDate(date);
      } else {
        setFirstTaskName("");
        setFirstTaskValue("");
        setFirstTaskDate("");
      }
    } else {
      setFirstTaskName("");
      setFirstTaskValue("");
      setFirstTaskDate("");
    }
  }, [newTasks]);

  const handleOpen = () => {
    setIsOpen(true);
    setButtonClass("taskOpen taskOpenAnimation");
    setContainerClass("openContainer containerAnimation");
    handleUpdateTasks();
  };

  const handleClose = () => {
    setIsOpen(false);
    setButtonClass("taskClose taskCloseAnimation");
    setContainerClass("openContainer");
    handleUpdateTasks();
  };

  const handleTaskInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleTaskDateInputChange = (event) => {
    setNewDate(event.target.value);
  };

  const handleCheckboxChange = (taskId, isChecked) => {
    newTasks[taskId].ticked = isChecked;
    handleSaveTasks(false);
    handleUpdateTasks();
  };

  const handleDeleteTask = (taskId, isDeleted) => {
    handleDeleteChange(taskId);
    handleUpdateTasks();
  };

  const handleSaveTasks = (update) => {
    fetch("http://localhost:8080/user/" + tasks.uid + "/saveTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required
      },
      body: JSON.stringify({
        tasks: newTasks,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Request was successful
          console.log(response);
          return response.json();
        } else {
          // Handle errors
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then((data) => {
        // Handle the response data
        if (update) {
          handleUpdateTasks();
        }
      })
      .catch((error) => {
        // Handle any errors during the request
        console.error(error);
      });
  };

  const handleUpdateTasks = () => {
    fetch("http://localhost:8080/user/" + tasks.uid + "/getTasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Return the response data here
        } else {
          // Handle errors
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then((data) => {
        // Handle the response data
        setNewTasks(data);
        console.log("DATATATA" + JSON.stringify(data));
      })
      .catch((error) => {
        // Handle any errors during the request
        console.error(error);
      });
  };

  const handleAddTask = () => {
    fetch("http://localhost:8080/user/" + tasks.uid + "/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required
      },
      body: JSON.stringify({
        [generateUUID()]: {
          content: newTask,
          ticked: false,
          date: newDate,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Request was successful
          setNewTask("");
          return response.json();
        } else {
          // Handle errors
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then((data) => {
        // Handle the response data
        handleUpdateTasks();
      })
      .catch((error) => {
        // Handle any errors during the request
        console.error(error);
      });
  };

  const handleDeleteChange = (id) => {
    const url =
      "http://localhost:8080/user/" +
      tasks.uid +
      "/deleteTask" +
      "?taskId=" +
      id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Make sure to set the content type of the request body
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    })
      .then((response) => {
        console.log(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log("TASKS:", data);
      })
      .catch((error) => {
        console.error("There was an error sending the request:", error);
      });
  };

  const addTaskButtons = (
    <div className={containerClass}>
      <KeyboardArrowUpIcon
        className="closeicon"
        onClick={handleClose}
        fontSize="large"></KeyboardArrowUpIcon>
      <div className="tasksContainer">
        {Object.entries(newTasks).map(([taskId, taskData]) => (
          <Task
            key={taskId}
            content={taskData.content}
            isChecked={taskData.ticked}
            date={taskData.date}
            onCheckboxChange={(isChecked) =>
              handleCheckboxChange(taskId, isChecked)
            }
            isFirst={false}
            uid={uid}
            onDeleteChange={(isDeleted) => {
              handleDeleteTask(taskId, isDeleted);
            }}
          />
        ))}
        Add task:
        <div className="submitTaskContainer">
          <TextField
            className="submitTaskText"
            id="outlined-basic"
            variant="outlined"
            label="Task"
            value={newTask}
            onChange={handleTaskInputChange}
          />
          <TextField
            className="submitTaskDate"
            id="outlined-basic"
            variant="outlined"
            label="Date"
            value={newDate}
            onChange={handleTaskDateInputChange}
          />
          <Button
            className="submitTaskButton"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleAddTask}></Button>
        </div>
      </div>
    </div>
  );
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const closedContainer = (
    <div className="closedContainer">
      
        <Button className="addATask" onClick={handleOpen}>
         + Add a task here!
        </Button>
      
      
    </div>
  );

  return (
    <div className="modalContainer">
      <div className={buttonClass}>
        {isOpen ? addTaskButtons : closedContainer}
      </div>
    </div>
  );
}
