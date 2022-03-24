import "./Devices.sass";
import { useFetchDevicesQuery } from "services/devices";

const renderDevices = (deviceCount: number) => {
	const radius = 200;
	const containerWidth = 400;
	const containerHeight = 400;

	let angle = 0;
	const step = (2 * Math.PI) / deviceCount;

	return Array.from(Array(deviceCount)).map((i) => {
		const x = Math.round(containerWidth / 2 + radius * Math.cos(angle) - 25);
		const y = Math.round(containerHeight / 2 + radius * Math.sin(angle) - 25);

		angle += step;

		return <span key={i} className="device" style={{ top: y + "px", left: x + "px" }} />;
	});
};

const Devices = () => {
	const { data: devicesFetchResult } = useFetchDevicesQuery(undefined, {pollingInterval: 5000});

	if (!devicesFetchResult) {
		return null;
	}

  const deviceCount = devicesFetchResult.devices.length;

	return (
		<div className="devices-root">
			<p className="label">
        {deviceCount} 
        <br /> devices online
			</p>
			<div className="devices-anchor">
				{
          renderDevices(deviceCount)
        }
			</div>
		</div>
	);
};

export default Devices;
