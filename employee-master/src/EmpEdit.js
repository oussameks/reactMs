import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const UpdateEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
      firstName: '',
      lastName: '',
      mail: '',
      password: '',
    });
  
    const navigate = useNavigate();
  
    useEffect(() => {
      // Fetch the current employee details using the employee ID
      const fetchEmployeeDetails = async () => {
        try {
          const response = await fetch(`http://localhost:9094/detailEmployee/${id}`);
          if (response.ok) {
            const employeeDetails = await response.json();
            setEmployee(employeeDetails);
          } else {
            console.error('Error fetching employee details');
          }
        } catch (error) {
          console.error('Error fetching employee details', error);
        }
      };
  
      fetchEmployeeDetails();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          
        // Your PUT request to update the employee details
        const response = await fetch(`http://localhost:9094/updateEmployee/${id}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(employee),
        });
  
        if (response.ok) {
          // Redirect to the employee details page after successful update
          navigate(`/detailEmployee/${id}`);
          alert("Saved successfully.");
        } else {
          console.error("Error updating employee details");
        }
      } catch (error) {
        console.error("Error updating employee details", error.message);
      }
    };
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Employee Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input required type="text" value={employee.firstName} onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })} className="form-control"></input>
                                    {employee.firstName.length==0  && <span className="text-danger">Enter the first name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input required type="text" value={employee.lastName} onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })} className="form-control"></input>
                                    {employee.lastName.length==0 && <span className="text-danger">Enter the last name</span>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" value={employee.mail} onChange={(e) => setEmployee({ ...employee, mail: e.target.value })} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" value={employee.password} onChange={(e) => setEmployee({ ...employee, password: e.target.value })} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-check">
                                    <input type="checkbox" className="form-check-input"></input>
                                        <label  className="form-check-label">Is Active</label>
                      
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">Update</button>
                                       <Link to={`/detailEmployee/${id}`} className="btn btn-danger">Cancel</Link>
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
}
 
export default UpdateEmployee;