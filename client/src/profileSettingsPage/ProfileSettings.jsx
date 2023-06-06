import React ,{useState} from "react";
import "./Components/Profile.css";
import Header from "../shared/Header";
import { useSelector,useDispatch } from "react-redux";
import Profile from "./Profile";
import dataInData from "../mainpage/mainpageComponents/data";
import Settings from "./Settings";
const ProfileSettings = () => {
   const [activeComponent, setActiveComponent] = useState("profile");
  
   const handleComponentChange = (component) => {
     setActiveComponent(component);
   };
  //constants
  const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
  //render
  return (
    <>
      <Header
        showButtons={false}
        showDarkModeButton={true}
        showDashBoardButtons={true}
        tasks={dataInData.tasks}
        uid={user.uid}
      />
      <div className="profile-setting">
        <div className="side-bar">
          {" "}
          <button
            className={activeComponent === "profile" ? "active" : ""}
            onClick={() => handleComponentChange("profile")}>
            Profile
          </button>
          <button
            className={activeComponent === "settings" ? "active" : ""}
            onClick={() => handleComponentChange("settings")}>
            Settings
          </button>
        </div>

        <div className="profile-setting-content">
          {activeComponent === "profile" ? (
            <Profile user={user} dispatch={dispatch}/>
          ) : (
            <Settings user={user} dispatch={dispatch} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
