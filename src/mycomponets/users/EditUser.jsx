import React, { useState } from "react";
import axios from "axios";

const EditUser = ({ elements }) => {
  const EditId = elements.isbn;
  const [editUser, setEditUser] = useState({
    title: elements.title,
    isbn: elements.isbn,
    status: elements.status,
    pageCount: elements.pageCount,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };
  const EditApiCall = async (EditId) => {
    await axios.put(`http://localhost:8000/users?isbn=${EditId}`, editUser);
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-outline-primary "
        data-bs-toggle="modal"
        data-bs-target="#EditModal"
        onClick={() => {
        }}
      >
        Edit
      </button>
      <div
        class="modal fade"
        id="EditModal"
        tabindex="-1"
        aria-labelledby="EditeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Book data
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form class="row g-3 needs-validation" novalidate>
                <div class="col-md-12">
                  <label for="validationCustom01" class="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom01"
                    name="title"
                    value={editUser.title}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col-md-12">
                  <label for="validationCustom02" class="form-label">
                    ISBN
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom02"
                    name="isbn"
                    value={editUser.isbn}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col-md-12">
                  <label for="validationCustomUsername" class="form-label">
                    Status
                  </label>
                  <div class="input-group has-validation">
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      name="status"
                      value={editUser.status}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      required
                    />
                    <div class="invalid-feedback">
                      Please choose a username.
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <label for="validationCustomUsername" class="form-label">
                    Page Count
                  </label>
                  <div class="input-group has-validation">
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      name="pageCount"
                      value={editUser.pageCount}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      required
                    />
                    <div class="invalid-feedback">
                      Please choose a username.
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    class="btn btn-primary"
                    onClick={() => {
                      EditApiCall(EditId);
                    }}
                  >
                    Edit User Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
