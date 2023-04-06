import { Button, TextField } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import { useHomeStyles } from "./Home.styles";
import downArrowIcon from "../../assets/images/downArrowIcon.png";
import {
  BUSINESS_MANAGMENT,
  FINANCE_MANAGEMENT,
  SOFTWARE_DEVELOPMENT,
  SYSTEM_ADMIN_ENGINEER,
  SIGN_IN,
  SIGN_UP,
  TASKS,
  PROFILE,
  HOME,
} from "../../constants/auth";
import { useAuth } from "../../context/Context";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { tasksRef } from "../../firebase";

function Home() {
  const styles = useHomeStyles();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [threeTasks, setThreeTasks] = useState([]);

  useEffect(() => {
    const tasks = [];
    async function getData() {
      const snapshot = await getDocs(tasksRef);
      snapshot.forEach((doc) => tasks.push({ ...doc.data(), id: doc.id }));
      const taskSorted = tasks.sort((a, b) => b.view - a.view);
      const result = taskSorted.splice(0, 3);
      setThreeTasks(result);
    }
    getData();
  }, []);

  const onMyProfileClick = () => {
    navigate(PROFILE);
  };

  const onOpneClick = (id) => {
    navigate(`/task/${id}`);
  };
  return (
    <div className={styles.parent}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div>
            <TextField
              className={styles.search}
              label="Search"
              variant="filled"
            />
          </div>
          <div className={styles.types}>
            <span>Types</span>
          </div>
          <div>
            <img src={downArrowIcon} className={styles.downArrowIcon} />
          </div>

          <div className={styles.type}>
            <div>{SOFTWARE_DEVELOPMENT}</div>
            <div>{FINANCE_MANAGEMENT}</div>
            <div>{BUSINESS_MANAGMENT}</div>
            <div>{SYSTEM_ADMIN_ENGINEER}</div>
          </div>
          <div className={styles.description}>
            Welcome to our site! We're platform dedicated to helping you develop
            your ideas and grow your business. Whever you are looking to connect
            with talented individuals to fill specific roles, or seeking to
            improve your own skills and productivy, we're here to support you
            every step of the way. With our user-friendly tools and resources,
            you'll be able to effectively tackle any job with confidence and
            precision. Join our community today and unlock your full potential!
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.logRegister}>
            {user ? (
              <div>
                <NavLink to={PROFILE} style={{ textDecoration: "none" }}>
                  <Button variant="contained" onClick={onMyProfileClick}>
                    My Profile
                  </Button>
                </NavLink>
                <NavLink to={HOME} style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    className={styles.register}
                    onClick={() => logout()}
                  >
                    Sign Out
                  </Button>
                </NavLink>
              </div>
            ) : (
              <div>
                <NavLink to={SIGN_IN} style={{ textDecoration: "none" }}>
                  <Button variant="contained">Sign In</Button>
                </NavLink>
                <NavLink to={SIGN_UP} style={{ textDecoration: "none" }}>
                  <Button variant="outlined" className={styles.register}>
                    Sign Up
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
          <div className={styles.tasks}>
            <div className={styles.label}>
              <span>
                <Button>
                  <NavLink to={TASKS} style={{ textDecoration: "none" }}>
                    Tasks
                  </NavLink>
                </Button>
              </span>
            </div>
            {threeTasks.map((task) => (
              <div className={styles.task} key={task.id}>
                <div
                  style={{
                    backgroundImage: `url(${task.userPhotoUrl})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                  }}
                ></div>
                <div className={styles.open}>
                  {task.taskName} {task.typeTask}
                  <Button onClick={() => onOpneClick(task.id)}>Open</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <h5>
            <span>.</span> Contact Information
          </h5>
          <h5>
            <span>.</span> Terms of Use
          </h5>
        </div>
        <div>
          <h5>Example:@ 2023 [Step One]</h5>
        </div>
      </div>
    </div>
  );
}
export default Home;
