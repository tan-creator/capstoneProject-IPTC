import React from "react";

export default function FormComponent(props) {
  const handleGetTodo = (e) => {
    props.handleGetTodo(e.target.value);
  };
  const handleGetStatus = (e) => {
    let isCheck = e.target.value === "true" ? true : false;
    props.handleGetStatus(isCheck);
  };
  const handleOnClick = (e) => {
    e.preventDefault();
    props.abc();
  };

  return (
    <div className="col-lg-4">
      <form action="" method="POST" role="form">
        <legend>Admin</legend>
        <div className="form-group">
          <label htmlFor="">User Name</label>
          <input
            onChange={handleGetTodo}
            type="text"
            className="form-control"
            id=""
            value={props.todo}
            placeholder="Input field"
          />
          <label htmlFor="">Stastus</label>
          <select
            onChange={handleGetStatus}
            name=""
            id="input"
            className="form-control"
            required="required"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleOnClick}
          className="mt-3 btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
