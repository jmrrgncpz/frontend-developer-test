import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DevicesScreen from "screens/devices/DevicesScreen";
import * as devicesService from "services/devices";

const useFetchDevicesQuerySpy = jest.spyOn(devicesService, "useFetchDevicesQuery");

describe("<DevicesScreen />", () => {
	beforeEach(() => {
		useFetchDevicesQuerySpy.mockReturnValue({
			data: {
				devices: [{}, {}]
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

	it("should open login screen when Logout is clicked", async () => {
		render(<div></div>);

		userEvent.click(screen.getByRole("button", { name: /logout/i }));
		expect(await screen.findByText("Login")).toBeInTheDocument();
	});
});
