import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe.skip("<DevicesScreen />", () => {
	it("should show lables and circles when there are > 0 devices", () => {
		// mock return a response with 2 devices from query spy
		const { container } = render(<div></div>);

		expect(screen.getByText(/2 devices online/i)).toBeInTheDocument();
		expect(container.querySelectorAll(".device-item").length).toBe(2);
	});

	it("show show labels and no circle when there is no device", () => {
		// mock return a response with 0 devices from query spy
		const { container } = render(<div></div>);

		expect(screen.getByText(/0 devices online/i)).toBeInTheDocument();
		expect(container.querySelectorAll(".device-item").length).toBe(0);
	});

	it("should call mutation with { name: string; email: string; repoUrl: string; message: string } when Notify button is clicked", async () => {
		// spy on notify mutation
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
