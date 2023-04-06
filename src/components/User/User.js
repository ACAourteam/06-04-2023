import { Button } from "@mui/material";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { SIGN_IN, TASKS } from "../../constants/auth";
import { auth, tasksRef, usersRef } from "../../firebase";
import { useUserStyles } from "./User.styles";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/Context";
import { toCountTime } from "../../utils/utils";

function User() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const styles = useUserStyles();
  const [userTasks, setUserTasks] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const users = [];
    async function getData() {
      const snapshot = await getDocs(usersRef);
      snapshot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }));
      const result = users.find((elem) => elem.id === params.id);
      setUser(result);
    }
    getData();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    const tasks = [];
    async function getData() {
      const snapshot = await getDocs(tasksRef);
      snapshot.forEach((doc) => tasks.push({ ...doc.data(), id: doc.id }));
      const result = tasks
        .filter((elem) => elem.email === user?.email)
        .sort((a, b) => b.time - a.time);
      setUserTasks(result);
    }
    getData();
  }, [user]);

  const signOut = () => {
    logout();
    navigate(`/user/${params.id}`);
  };
  const signIn = () => {
    navigate(SIGN_IN);
  };
  return (
    <div>
      <div className={styles.parent}>
        <div className={styles.menu}>
          <div className={styles.menuRight}>
            <div
              style={{
                backgroundImage: `url(
            "${user?.photoURL}"
          )`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: 90,
                height: 90,
                borderRadius: "50%",
              }}
            ></div>
            <div>
              <h1 className={styles.userName}>
                {user?.name} {user?.surname}
              </h1>
            </div>
          </div>
          <div className={styles.menuLeft}>
            <div>
              {auth.currentUser ? (
                <Button onClick={signOut}>Sign Out</Button>
              ) : (
                <Button onClick={signIn}>Sign In</Button>
              )}
            </div>

            <div>
              <NavLink to={TASKS} style={{ textDecoration: "none" }}>
                <Button variant="contained" color="success">
                  All Tasks
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className={styles.descriptionCategory}>
          <div className={styles.description}>
            <p>{user?.description}</p>
          </div>
          <div className={styles.categories}>
            <h3 className={styles.myCategories}>{user?.name} Categories</h3>
            {user?.myCategories?.map((category) => {
              return (
                <div key={uuidv4()} style={{ color: "white" }}>
                  <p>{category}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.tasks}>
          <h1 className={styles.myTasks}>
            <span>{user?.name} Tasks</span>
          </h1>
          {userTasks.map((task, index) => {
            return (
              <div key={task.id}>
                <div className={styles.task}>
                  <div>
                    <p style={{ margin: "auto" }}>No:{index + 1}</p>
                    <p>{task.taskName}</p>
                  </div>
                  <p>description - {task.taskDescription} </p>
                </div>
                {task?.comments.length ? (
                  <div className={styles.comments}>
                    <div
                      style={{
                        background: "#535353FF",
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      Comments
                    </div>
                    {task?.comments.map((comment) => (
                      <div key={uuidv4()} className={styles.commentValue}>
                        <p>{comment.commentValue}</p>
                        <p>{toCountTime(comment.time)}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default User;
