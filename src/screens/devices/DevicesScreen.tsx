import "./DevicesScreen.sass";
import Devices from "components/devices/Devices";
import Button from "components/button/Button";
import { useDispatch } from "react-redux";
import { clearToken } from "store/reducers/authSlice";
import { useNotifyMutation } from "services/notification";

const DevicesScreen = () => {
	const [notify, { isLoading }] = useNotifyMutation();
	const dispatch = useDispatch();
	const handleLogoutClick = () => {
		dispatch(clearToken());
	};
	const handleNotifyClick = () => {
		notify({
			name: "Jesmer Paz",
			email: "paz.jesr@gmail.com",
			repoUrl: "https://github.com/jmrrgncpz/frontend-developer-test",
			message: "I'm SO done. ;)",
		});
	};

	return (
		<div className="devices-screen-root screen">
			<Devices />
			<footer>
				<Button variant="light" onClick={handleNotifyClick}>
					notify
				</Button>
				<Button variant="dark" onClick={handleLogoutClick}>
					log out
				</Button>
			</footer>
		</div>
	);
};

export default DevicesScreen;
