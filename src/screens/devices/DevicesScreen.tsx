import './DevicesScreen.sass';
import Devices from "components/devices/Devices";
import Button from 'components/button/Button';
import { useDispatch } from 'react-redux';
import { clearToken } from 'store/reducers/authSlice';

const DevicesScreen = () => {
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(clearToken());
  }

  return (
    <div className="devices-screen-root screen">
      <Devices />
      <footer>
        <Button variant='dark' onClick={handleLogoutClick}>log out</Button>
      </footer>
    </div>
  )
}

export default DevicesScreen;