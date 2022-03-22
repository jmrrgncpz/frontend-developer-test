import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const getEmailAddressField = () => screen.getByPlaceholderText(/email address/i);
const getPasswordField = () => screen.getByPlaceholderText(/password/i);

const setupValidForm = () => {
	userEvent.type(getEmailAddressField(), "something@example.com");
	userEvent.type(getPasswordField(), "test123");
};

describe("<LoginScreen />", () => {
	it("should show proper errors for input fields", () => {
		const emailInvalidError = /'email address should be a valid email'/i;
		const passwordRequiredError = /password is required/i;

		render(<div></div>);

		userEvent.click(
			screen.getByRole("button", {
				name: /log in/i,
			})
		);
		expect(screen.getByText(/'email address is required'/i)).toBeInTheDocument();
		expect(screen.getByText(passwordRequiredError)).toBeInTheDocument();

		userEvent.type(getEmailAddressField(), "something");
		expect(screen.getByText(emailInvalidError)).toBeInTheDocument();

		setupValidForm();

		expect(screen.queryByText(emailInvalidError)).not.toBeInTheDocument();
		expect(screen.queryByText(passwordRequiredError)).not.toBeInTheDocument();
	});

	it("should call mutation with { email, password } when Login button is clicked", async () => {
		// spy on login mutation
		render(<div></div>);

		setupValidForm();
		await waitFor(() =>
			expect(jest.fn()).toHaveBeenCalledWith({
				email: "something@example.com",
				password: "test123",
			})
		);
    
	});

	it("should call mutation and show error on a 401 response when Login button is clicked", async () => {
		// spy on login mutation
		// mock return 401 response from the mutation spy
		render(<div></div>);

		setupValidForm();
		await waitFor(() =>
			expect(jest.fn()).toHaveBeenCalledWith({
				email: "something@example.com",
				password: "test123",
			})
		);

		expect(screen.getByText(/sample error message/i));
	});
});
