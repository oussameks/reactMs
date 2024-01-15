import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



const EmpDetail = () => {
    const { empid } = useParams();
    const navigate = useNavigate();

    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:9094/detailEmployee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const handleDelete = async () => {
        try {
          // Your delete logic here
          await fetch(`http://localhost:9094/deleteEmployee/${empid}`, {
            method: 'DELETE',
          });
    
          // Redirect to the list of employees after deletion
          navigate('/'); // Assuming '/' is the route for the list of employees
        } catch (error) {
          console.error('Error deleting employee', error);
        }
      };
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Employee Create</h2>
                </div>
                <div className="card-body"></div>

                {empdata &&
                    <div>
                        <h2>The Employee name is : <b>{empdata.firstName} {empdata.lastName}</b>  ({empdata.id})</h2>
                        <h3>Contact Details</h3>
                        <h5>Email is : {empdata.mail}</h5>
                        <h5>Phone is : +212689547624</h5>
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                        <Link className="btn btn-danger" to={`/updateEmployee/${empdata.id}`}>Update Employee</Link>
                        <Link className="btn btn-danger" onClick={handleDelete}>Delete Employee</Link>

                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default EmpDetail;