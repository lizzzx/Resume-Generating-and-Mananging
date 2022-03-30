import React from "react"; // { useEffect, useRef, useState  }
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

export default function Project(props) {
  // const [isEditing, setEditing] = useState(false);
  // const [newName, setNewName] = useState('');
  // const [newDate, setNewDate] = useState('');
  // const [newDescription, setNewDescription] = useState('');

  // const editFieldRef = useRef(null);
  // const editButtonRef = useRef(null);

  // const wasEditing = usePrevious(isEditing);

  // function handleNameChange(e) {
  //   setNewName(e.target.value);
  // }

  // function handleDateChange(e) {
  //   setNewDate(e.target.value);
  // }

  // function handleDescriptionChange(e) {
  //   setNewDescription(e.target.value);
  // }

  // function handleSubmit(e) {
  // e.preventDefault();
  // if nothing is changed, cannot "EDIT"
  // if (!newName.trim() && !newDate.trim() && !newDescription.trim()) {
  //   alert("Cancel if you dont want to update");
  //   return;
  // }
  // props.editproject(props.id, newName, newDate, newDescription);
  // setNewName("");
  // setNewDate("");
  // setNewDescription("");
  // setEditing(false);
  // document.getElementById("output-box").innerHTML += "Sorry! <code>preventDefault()</code> won't let you check this!<br>";
  // }

  // const editingTemplate = (
  //   <form className="stack-small" onSubmit={handleSubmit}>
  //     <div className="form-group">
  //       <label className="Project-label" htmlFor={props.id}>
  //       </label>
  //       <input
  //         placeholder="New Title or Name"
  //         id={props.id}
  //         className="Project-text"
  //         type="text"
  //         value={newName || props.name}
  //         onChange={handleNameChange}
  //         ref={editFieldRef}
  //       />
  //       <label className="Project-label" htmlFor={props.id}>
  //       </label>
  //       <input
  //         placeholder="New Date"
  //         id={props.id}
  //         className="Project-text"
  //         type="text"
  //         value={newDate || props.date}
  //         onChange={handleDateChange}
  //         ref={editFieldRef}
  //       />
  //       <label className="Project-label" htmlFor={props.id}>
  //       </label>
  //       <input
  //         placeholder="New Description"
  //         id={props.id}
  //         className="Project-text"
  //         type="text"
  //         value={newDescription || props.description}
  //         onChange={handleDescriptionChange}
  //         ref={editFieldRef}
  //       />
  //     </div>
  //     <div className="btn-group">
  //       <button
  //         type="button"
  //         className="btn Project-cancel"
  //         onClick={() => setEditing(false)}
  //       >
  //         Cancel
  //       </button>
  //       <button type="submit" className="btn btn__primary Project-edit">
  //         Save Changes
  //       </button>
  //     </div>
  //   </form>
  // );

  const navigate = useNavigate();
  const routeChange = () => {
    let path = `../addEducation`;
    navigate(path);
  };

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <label className="Project-label" htmlFor={props.id}>
          <Typography variant="h5" gutterBottom>
            {props.school}{" "}
          </Typography>
          <span>{props.degree}</span>
          <br></br>
          <span>
            <var>{props.startMonth} </var>,<var>{props.startYear} </var> to{" "}
            <var>{props.endMonth} </var>,<var>{props.endYear} </var>
          </span>
          <p>
            <var>{props.description} </var>
          </p>
        </label>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={routeChange}
          // onClick={() => setEditing(true)}
          // ref={editButtonRef}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteproject(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return <li className="Project"> {viewTemplate}</li>;
}
