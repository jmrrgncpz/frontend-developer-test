import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DevicesScreen from "screens/devices/DevicesScreen";
import * as devicesService from "services/devices";
import { clearToken } from "store/reducers/authSlice";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useDispatch: () => mockDispatch,
}));

const useFetchDevicesQuerySpy = jest.spyOn(devicesService, "useFetchDevicesQuery");

describe("<DevicesScreen />", () => {
	beforeEach(() => {
		mockDispatch.mockClear();

		useFetchDevicesQuerySpy.mockReturnValue({
			data: {
				devices: [{}, {}],
			},
			refetch: jest.fn(),
		});
	});

	it("should show lables and circles", async () => {
		const { container } = render(<DevicesScreen />);

		expect(await screen.findByText(/2 devices online/i)).toBeInTheDocument();
		expect(container.querySelectorAll(".device").length).toBe(2);
	});

	it("should call mutation with { name: string; email: string; repoUrl: string; message: string } when Notify button is clicked", async () => {
		render(<div></div>);

		userEvent.click(
			screen.getByRole("button", {
				name: /notify/i,
			})
		);
		await waitFor(() =>
			expect(jest.fn()).toHaveBeenCalledWith({
				name: "Jesmer Paz",
				email: "paz.jesr@gmail.com",
				repoUrl: "https://github.com/jmrrgncpz/frontend-developer-test",
				message: "Well, Hi there.",
			})
		);
	});

	it("should call dispatch with clearToken action when Logout is clicked", async () => {
		render(<DevicesScreen />);

		userEvent.click(screen.getByRole("button", { name: /log out/i }));
		await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(clearToken()));
	});
});
