import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    props.addproject(name, date, description);
    setName("");
    setDate("");
    setDescription("");
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDateChange(e) {
    setDate(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-Project-input" className="label__lg">
          Education
        </label>
      </h2>

      <input
        type="text"
        id="new-Project-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleNameChange}
      />
      <br />
      <input
        type="text"
        id="new-Project-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={date}
        placeholder="MM-YY to MM-YY"
        // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  // restrictions
        onChange={handleDateChange}
      />
      <br />
      <input
        type="text"
        id="new-Project-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
