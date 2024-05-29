import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
const Columns = () => {
  const [extended, setExtended] = useState(false);
  const { option } = useContext(Context);
  useEffect(() => {
    console.log(option);
  }, [option]);

  return (
    <div className="sidebar">
      <div className="top">
        <img
          src={assets.menu_icon}
          className="menu"
          alt="menu-icon"
          onClick={() => {
            setExtended((prev) => !prev);
          }}
        />
        {extended ? (
          <div className="recent">
            <p className="recent-title">Columns</p>
           {option}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Columns;
