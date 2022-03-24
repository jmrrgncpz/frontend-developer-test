import DevicesScreen from "screens/devices/DevicesScreen";
import LoginScreen from "screens/login/LoginScreen";

function App() {
	const token = localStorage.getItem("token");
	return <div className="App">{token ? <DevicesScreen /> : <LoginScreen />}</div>;
}

export default App;
