import { useState } from "react";
import "./TaskModal.css";
import Task from "./Task.jsx";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function TaskModal(tasks) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonClass, setButtonClass] = useState("taskClose");
  const [containerClass, setContainerClass] = useState("openContainer");

  const handleOpen = () => {
    setIsOpen(true);
    setButtonClass("taskOpen taskOpenAnimation");
    setContainerClass("openContainer containerAnimation");
    console.log(tasks);
  };

  const handleClose = () => {
    setIsOpen(false);
    setButtonClass("taskClose taskCloseAnimation");
    setContainerClass("openContainer");
  };
  const addTaskButtons = (
    <div className={containerClass}>
      <KeyboardArrowUpIcon
        className="closeicon"
        onClick={handleClose}
      ></KeyboardArrowUpIcon>
      <div className="tasksContainer">
        {Object.entries(tasks.tasks).map(([taskName, isChecked]) => (
          <Task content={taskName} isChecked={isChecked} />
        ))}

        <div className="submitTaskContainer">
          <TextField
            className="submitTaskText"
            id="outlined-basic"
            variant="outlined"
          />
          <Button
            className="submitTaskButton"
            variant="contained"
            endIcon={<SendIcon />}
          ></Button>
        </div>
      </div>
    </div>
  );

  const closedContainer = (
    <div className="closedContainer">
      <KeyboardArrowDownIcon
        className="openicon"
        onClick={handleOpen}
      ></KeyboardArrowDownIcon>
    </div>
  );

  const handleAddTask = () => {
    fetch("http://localhost:8080/user/3312334082/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required
      },
      body: JSON.stringify({
        "Finish tasks for SDP": false,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Request was successful
          return response.json();
        } else {
          // Handle errors
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors during the request
        console.error(error);
      });
  };

  return (
    <div className="modalContainer">
      <div className={buttonClass}>
        {isOpen ? addTaskButtons : closedContainer}
      </div>
    </div>
  );
}
