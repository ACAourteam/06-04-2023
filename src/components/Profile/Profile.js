import { Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { auth, db, tasksRef, usersRef } from "../../firebase";
import { useAuth } from "../../context/Context";
import { doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { HOME, SIGN_IN, TASKS } from "../../constants/auth";
import AddTask from "../AddTask/AddTask";
import { useProfileStyles } from "./Profile.styles";
import ChangeDescription from "../ChangeDescription/ChangeDescription";
import { v4 as uuidv4 } from "uuid";
import AddCategory from "../AddCategory/AddCategory";
import telephone from "../../assets/images/telephone.png";
import blueDot from "../../assets/images/blueDot.png";
import { toCountTime } from "../../utils/utils";

function Profile() {
  const [logedUser, setLogedUser] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showAddTask, setShowAddTask] = useState(false);
  const [userTasks, setUserTasks] = useState([]);
  const [showChangeDescription, setShowChangeDescription] = useState(false);
  const [logedUserDescription, setLogedUserDescription] = useState("");
  const styles = useProfileStyles();
  const [category, setCategory] = useState("");
  const [update, setUpdate] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [logedUserNewsLength, setLogedUserNewsLength] = useState("");
  const [newLogedUser, setNewLogedUser] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    const users = [];
    async function getData() {
      const snapshot = await getDocs(usersRef);
      snapshot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }));
      const result = users.find((elem) => elem.email === user?.email);
      setLogedUserDescription(result?.description);
      setLogedUser(result);
      setLogedUserNewsLength(result.news.length);
    }
    getData();
  }, [user, category, newLogedUser]);

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
  }, [showAddTask, update]);

  const onDeleteTaskClick = (id) => {
    deleteDoc(doc(db, "tasks", id));
    setUpdate(!update);
  };

  const logOut = async () => {
    try {
      await logout();
      navigate(HOME);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onAddTaskClick = () => {
    setShowAddTask(true);
  };

  const onChangeMyDescriptionClick = () => {
    setShowChangeDescription(true);
  };

  const onDeleteCategory = async (index) => {
    logedUser?.myCategories.splice(index, 1);
    await updateDoc(doc(db, "users", logedUser.id), {
      myCategories: [...logedUser?.myCategories],
    });
    setUpdate(!update);
  };

  const onAddCategoryClick = () => {
    setShowAddCategory(true);
  };

  const onBlueDotClick = (e) => {
    e.stopPropagation();
    setShowDiv(!showDiv);
    setLogedUserNewsLength((prev) => {
      if (prev) {
        updateDoc(doc(db, "users", logedUser.id), {
          news: [],
        });
      } else {
        setNewLogedUser(!newLogedUser);
      }
    });
  };
  {
    if (auth.currentUser) {
      return (
        <div className={styles.parent}>
          <div className={styles.menu}>
            <div className={styles.menuRight}>
              <div
                style={{
                  backgroundImage: `url(
                    "${logedUser?.photoURL}"
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
                  {logedUser?.name} {logedUser?.surname}{" "}
                </h1>
              </div>
            </div>
            <div className={styles.menuLeft}>
              <div>
                <Button
                  onClick={onAddTaskClick}
                  variant="contained"
                  color="success"
                >
                  Add task
                </Button>
              </div>
              <div>
                {" "}
                <Button
                  onClick={onChangeMyDescriptionClick}
                  variant="contained"
                  color="info"
                >
                  Change Description
                </Button>
              </div>
              <div>
                <Button onClick={onAddCategoryClick}>Add Category</Button>
                {showAddCategory && (
                  <AddCategory
                    setShowAddCategory={setShowAddCategory}
                    setCategory={setCategory}
                    category={category}
                    logedUser={logedUser}
                  />
                )}
              </div>
              <div>
                <Button onClick={logOut}>Sign Out</Button>
              </div>
              <div>
                <NavLink to={TASKS} style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="success">
                    All Tasks
                  </Button>
                </NavLink>
              </div>
              {logedUser?.news?.length ? (
                <div
                  onClick={(e) => onBlueDotClick(e)}
                  style={{ position: "relative" }}
                >
                  <img src={blueDot} style={{ width: 18, height: 18 }} />
                  {showDiv && (
                    <div
                      style={{
                        position: "absolute",
                        width: 300,
                        minHeight: 150,
                        border: "1px solid",
                        background: "white",
                        borderRadius: 10,
                        top: 40,
                        right: -80,
                      }}
                    >
                      <h6 style={{ textAlign: "center", marginTop: 5 }}>
                        You have {logedUser?.news.length} new notification(s)
                      </h6>
                      {logedUser?.news.map((news) => {
                        if (news.hasOwnProperty("commentValue")) {
                          return (
                            <div key={uuidv4()} style={{ textAlign: "center" }}>
                              <p>
                                <span style={{ fontWeight: "bold" }}>
                                  {news.taskName}{" "}
                                </span>{" "}
                                have commented...{" "}
                              </p>
                              <p
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <span>{news.commentValue} </span>{" "}
                                <span>{toCountTime(news.time)}</span>
                              </p>
                              <hr
                                style={{
                                  borderTop: "1px solid black",
                                  width: "80%",
                                  textAlign: "center",
                                }}
                              ></hr>
                            </div>
                          );
                        } else {
                          return (
                            <div key={uuidv4()}>
                              <p style={{ textAlign: "center" }}>
                                <span style={{ fontWeight: "bold" }}>
                                  {news.taskName}
                                </span>{" "}
                                have responsed...{" "}
                              </p>
                              <p
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <span>{news.suggest}</span>
                                <span>{toCountTime(news.time)}</span>
                              </p>
                              <hr
                                style={{
                                  borderTop: "1px solid black",
                                  width: "80%",
                                  textAlign: "center",
                                }}
                              ></hr>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.descriptionCategory}>
            <div className={styles.description}>
              <p>{logedUserDescription}</p>
              {showChangeDescription && (
                <ChangeDescription
                  setShowChangeDescription={setShowChangeDescription}
                  logedUser={logedUser}
                  setLogedUserDescription={setLogedUserDescription}
                />
              )}
            </div>
            <div className={styles.categories}>
              <h3 className={styles.myCategories}>My Categories</h3>
              {logedUser?.myCategories?.map((category, index) => {
                return (
                  <div key={uuidv4()} style={{ color: "white" }}>
                    <p>
                      {category}
                      <button
                        className={styles.deleteCategoryTask}
                        onClick={() => onDeleteCategory(index)}
                      >
                        x
                      </button>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.tasks}>
            {showAddTask && (
              <AddTask setShowAddTask={setShowAddTask} logedUser={logedUser} />
            )}
            <h1 className={styles.myTasks}>
              <span>My Tasks</span>
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
                    <p>
                      <button
                        className={styles.deleteCategoryTask}
                        onClick={() => onDeleteTaskClick(task.id)}
                      >
                        x
                      </button>
                    </p>
                  </div>
                  <div className={styles.commentsResponses}>
                    {task?.comments.length ? (
                      <div className={styles.comments}>
                        <div
                          style={{ background: "#535353FF", padding: "10px" }}
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
                    {task?.responses.length ? (
                      <div className={styles.responses}>
                        <div
                          style={{ background: "#535353FF", padding: "10px" }}
                        >
                          Responses
                        </div>
                        {task?.responses.map((response) => (
                          <div key={uuidv4()} className={styles.responseValue}>
                            <p> Hello I'm {response.nameSurname}</p>

                            <p>{response.aboutPerson}</p>
                            <p
                              style={{
                                background: "#6E4700FF",
                                borderRadius: 10,
                              }}
                            >
                              I suggest - {response.suggest}
                            </p>
                            <p>{response.email}</p>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <img
                                  src={telephone}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                  }}
                                />
                                <p>{response.contactNumber}</p>
                              </div>
                              <p>{toCountTime(response.time)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return <Navigate to={SIGN_IN} />;
  }
}
export default Profile;
