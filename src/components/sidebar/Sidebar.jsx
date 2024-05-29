import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const searchItems = [
    "Housing Maintenance Code Violations",
    "Housing Litigations",
    "Open Market Order (OMO) Charges",
    "Order to Repair/Vacate Orders",
    "Handyman Work Order (HWO) Charges",
    "Housing Maintenance Code Complaints and Problems",
    "DOB Permit Issuance",
    "DOB Complaints Received",
    "DOB ECB Violations",
  ];

  // const searchItems = [{
  //   id: "1",
  //   labelName: 'Housing',
  //   code: "",
    
  // }]

  
  const [filteredItems, setFilteredItems] = useState([]);
  const { onSent, prevPrompts, setRecentPrompt, newChat, search, setSearch,setOption } =
    useContext(Context);

  const handleSearch = (value) => {
    setSearch(value);
    const filtered = searchItems.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

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

        <div
          className="api-search"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div>
            <img
              src={assets.searchIcon}
              alt=""
              style={{
                width: "18px",
                height: "20px",
                opacity: "0.5",
              }}
            />
            {extended && (
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            )}
          </div>
          {extended && (
            <select
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                padding: "5px",
                marginTop: "5px",
                borderRadius: "5px",
                background:"transparent",
                border: "none",
              }}
            >
              <option value="">Select an option</option>
              {filteredItems.length > 0
                ? filteredItems.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))
                : searchItems.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              {searchItems}
            </select>
          )}
        </div>

        <div className="new-chat">
          <img
            src={assets.plus_icon}
            alt=""
            onClick={() => {
              newChat();
            }}
          />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            Sample goes here
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
