import { useSelector } from "react-redux";
import DevicesScreen from "screens/devices/DevicesScreen";
import LoginScreen from "screens/login/LoginScreen";
import { tokenSelector } from "store/reducers/authSlice";

function App() {
	const token = useSelector(tokenSelector);
	return <div className="App">{token ? <DevicesScreen /> : <LoginScreen />}</div>;
}

export default App;
