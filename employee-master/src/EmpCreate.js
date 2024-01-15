import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(true);
  const [validation, setValidation] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const employeeData = { firstName, lastName, mail, password, active };

      // Your POST request to add a new employee
      const response = await fetch("http://localhost:9094/addEmployee", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        // Parse the response to get the ID of the newly created employee
        const { id } = await response.json();
        // Redirect to the details page of the newly created employee
        navigate(`/detailEmployee/${id}`);
        alert("Saved successfully.");
      } else {
        console.error("Error adding employee");
      }
    } catch (error) {
      console.error("Error adding employee", error.message);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Create</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      {/* You can replace this with an appropriate ID value */}
                      <input
                        value=""
                        disabled="disabled"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        required
                        value={firstName}
                        onMouseDown={() => setValidation(true)}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-control"
                      />
                      {firstName.length === 0 && validation && (
                        <span className="text-danger">Enter the first name</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        required
                        value={lastName}
                        onMouseDown={() => setValidation(true)}
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-control"
                      />
                      {lastName.length === 0 && validation && (
                        <span className="text-danger">Enter the last name</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
