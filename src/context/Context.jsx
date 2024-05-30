import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export const Context = createContext();

export const getChatID = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/chat`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const runChat = async (prompt) => {
  try {
    console.log(prompt);
    const response = await axios.post("http://localhost:3000/chat", { prompt: prompt });
    return response.data;
  } catch (error) {
    console.error("Error running chat:", error);
    return "";
  }
};

const ContextProvider = (props) => {
  const [option, setOption]=useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [resultData, setResultData] = useState([
  //   { ai: "Hello", human: "This is test1" },
  //   { ai: "Hi", human: "This is test2" },
  // ]);
  const [resultData, setResultData] = useState([]);

  const newChat = () => {
    setLoading(false);
    setShowResults(false);
  };

  const fetchPrevPrompts = async (id) => {
    try {
      const data = await getChatID(id);
      setPrevPrompts(data);
    } catch (error) {
      console.error("Error fetching previous prompts:", error);
    }
  };

  const onSent = async (prompt,setResultData) => {
    setResultData([
      { ai: "Hello", human: "This is test1" },
      { ai: "Hi", human: "This is test2" },
    ]);
    setLoading(true);
    setShowResults(true);
    let response;
    let userPrompt;

    if (prompt !== undefined) {
      userPrompt = prompt;
      setRecentPrompt(prompt);
    } else {
      userPrompt = input;
      setRecentPrompt(input);
    }

    try {
      response = await runChat(input);
      console.log(response.messages);
      setResultData(
        response.messages
      );
      return <Navigate to="/chat" state={{ resultData }} />;
      
    } catch (error) {
      console.error("Error while running chat:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  useEffect(() => {
    const chatID = "chat1"; 
    fetchPrevPrompts(chatID);
  }, []);

  const contextValue = {
    option,
    setOption,
    search,
    setSearch,
    password,
    setPassword,
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    input,
    setInput,
    showResults,
    loading,
    resultData,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
