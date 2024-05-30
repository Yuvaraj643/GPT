import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const { resultData } = location.state;

  return (
    <div>
      {resultData && resultData.length > 0 && (
        <div className="result">
          {resultData.map((data, index) => (
            <div key={index} className="result-title">
              <img src={assets.user} alt="User" />
              <p>{data.ai}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;    