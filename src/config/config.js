const API_BASE_URL = //process.env.REACT_APP_MODE === "production" ? ""
	//: process.env.REACT_APP_MODE === "dev" ? ""
	//: process.env.REACT_APP_MODE === "local" && 
    "http://localhost:8000";
const WEB_BASE_URL = //process.env.REACT_APP_MODE === "production" ? ""
	//: process.env.REACT_APP_MODE === "dev" ? ""
	//: process.env.REACT_APP_MODE === "local" && 
    "http://localhost:3000";

export {
	API_BASE_URL,
	WEB_BASE_URL
};