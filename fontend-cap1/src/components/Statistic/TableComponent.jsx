import React from "react";

export default function TableComponent(props) {
  const handleDelete = (id) => {
    props.handleDelete(id);
  };
  const handleUpdate = (id, todo, status) => {
    props.handleUpdate(id, todo, status);
  };

  const result = props.array1.map(function (item) {
    return (
      <tr>
        <td>{item?.id}</td>
        <td>{item?.todo}</td>
        <td>{item.status ? "Active" : "Inactive"}</td>
        <td>
          <button
            onClick={() => handleUpdate(item?.id, item?.todo, item?.status)}
            type="button"
            className="btn btn-success"
          >
            Update
          </button>

          <button
            onClick={() => handleDelete(item?.id)}
            type="button"
            className="btn btn-warning m-1"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="col-lg-8">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>{result}</tbody>
      </table>
    </div>
  );
}
