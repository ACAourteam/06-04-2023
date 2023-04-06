import { Button, TextField } from "@mui/material";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignInStyles } from "./SignIn.styles";
import { useAuth } from "../../context/Context";
import { auth } from "../../firebase";
import { PROFILE, SIGN_UP } from "../../constants/auth";
import stepOne from "../../assets/images/stepOne.png";

function SignIn() {
  const styles = useSignInStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const logUser = auth.currentUser;

  const onLoginClick = () => {
    signIn(email, password)
      .then(() => {
        navigate({ PROFILE });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  {
    if (logUser) {
      return <Navigate to={PROFILE} />;
    }
    return (
      <div className={styles.parent}>
        <div>
          <div
            style={{
              backgroundImage: `url(${stepOne})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: 600,
              height: 600,
              borderRadius: "50%",
            }}
          ></div>
        </div>
        <div>
          <div className={styles.formDiv}>
            <div className={styles.form}>
              <span>
                <TextField
                  required
                  label="Email"
                  variant="outlined"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              <span>
                <TextField
                  required
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>
              <span>
                <Button variant="contained" onClick={onLoginClick}>
                  Sign In
                </Button>
              </span>
              {/* <GoogleAuth /> */}
            </div>
            <Button variant="outlined">
              <NavLink to={SIGN_UP} style={{ textDecoration: "none" }}>
                Sign Up
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default SignIn;
