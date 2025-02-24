import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../Config/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import logo from "../assets/img/logo2.png";
import { useAuth } from "../authProvider";
import { auth } from "../Config/firebase.config"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // const usersCollection = collection(db, "users");
      // const q = query(usersCollection, where("email", "==", email));
      // const querySnapshot = await getDocs(q);

      // if (querySnapshot.empty) {
      //   throw new Error("No user found with this email");
      // }

      // const userDoc = querySnapshot.docs[0].data() as UserData;

      const {user} = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      // if (!user || !user.password) {
      //   throw new Error("User data not found or password is missing");
      // }

      // if (user.password !== password) {
      //   throw new Error("Invalid password");
      // }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1000,
      });

      login(user); // Set the user using the context login method
      // Redirect to the intended page or home page
      const { state } = location;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const from = (state as any)?.from || "/";
      navigate("/userDataForm");
    } catch (error) {
      console.error("Error logging in: ", (error as Error).message);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login failed",
        showConfirmButton: false,
        timer: 1000,
      });
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-6">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row">
                <div className="col-md-12">
                  <div className="card-body p-4 text-black d-flex flex-column justify-content-center">
                    <form onSubmit={handleLogin}>
                      <div className="d-flex align-items-center justify-content-center mb-3 pb-1">
                        <img src={logo} alt="" style={{ width: "120px" }} />
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3 text-center"
                        style={{ letterSpacing: "1px" }}
                      >
                        Login Here
                      </h5>

                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label htmlFor="floatingInput">Email address</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-block bg-success w-100 text-white"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Logging in..." : "Login"}
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
                        Don't have an account?{" "}
                        <Link to="/register" style={{ color: "#393f81" }}>
                          Register
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
  );
};

export default Login;
