import React, { useState } from "react";
import logo from "../assets/img/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Config/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}
const Register = () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {displayName, email, password, confirmPassword } = state;

  const handleChange = e => {
    setError("")
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // await addDoc(collection(db, "users"), {
      //   name: name,
      //   email: email,
      //   password: password,
      //   createdAt: new Date(),
      // });
      if(password !== confirmPassword) {
       return  setError("Passwords don't match");
      }
      if(displayName && email && password){
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, {displayName: displayName});
      } else {
       return setError("All fields are mandatory to fill");
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registered Successfully login to continue",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/login");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col col-xl-6">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-body p-4 text-black d-flex flex-column justify-content-center">
                      <form onSubmit={handleRegister}>
                        <div className="d-flex align-items-center justify-content-center mb-3 pb-1">
                          <img src={logo} alt="" style={{ width: "120px" }} />
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3 text-center"
                          style={{ letterSpacing: "1px" }}
                        >
                          Register Here
                        </h5>

                        {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="anischolar"
                            name="displayName"
                            value={displayName}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInput">Full Name</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            name="email"
                            value={email}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInput">Email address</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingPassword">Confirm password</label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-block bg-success w-100 text-white"
                            type="submit"
                            disabled={isSubmitting} // Disable button while submitting
                          >
                            {isSubmitting ? "Registering..." : "Register"}{" "}
                            {/* Show different text while submitting */}
                          </button>
                        </div>

                        <p className="text-center">
                          <a className="small text-muted" href="#!">
                            Forgot password?
                          </a>
                        </p>
                        <p
                          className="mb-5 pb-lg-2 text-center"
                          style={{ color: "#393f81" }}
                        >
                          Have an account?
                          <Link to="/login" style={{ color: "#393f81" }}>
                            Login
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
