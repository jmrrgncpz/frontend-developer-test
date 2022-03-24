import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginScreen from "screens/login/LoginScreen";
import * as authService from "services/auth";

const mockLoginMutation = jest.fn();
const useLoginMutationSpy = jest.spyOn(authService, "useLoginMutation");

const getEmailAddressField = () => screen.getByPlaceholderText(/email address/i);
const getPasswordField = () => screen.getByPlaceholderText(/password/i);

const setupValidForm = () => {
	userEvent.type(getEmailAddressField(), "something@example.com");
	userEvent.type(getPasswordField(), "test123");
};

const submitForm = () => {
	userEvent.click(
		screen.getByRole("button", {
			name: /log in/i,
		})
	);
};

describe("<LoginScreen />", () => {
	beforeEach(() => {
		useLoginMutationSpy.mockClear();
		mockLoginMutation.mockClear();

		useLoginMutationSpy.mockReturnValue([mockLoginMutation, {} as any]);
	});

	it("should show proper errors for input fields", async () => {
		mockLoginMutation.mockReturnValue({ unwrap: () => Promise.resolve() });

		const emailInvalidError = /email address must be a valid email/i;
		const passwordRequiredError = /password is required/i;

		render(<LoginScreen />);
		submitForm();

		expect(await screen.findByText(/email address is required/i)).toBeInTheDocument();
		expect(screen.getByText(passwordRequiredError)).toBeInTheDocument();

		userEvent.type(getEmailAddressField(), "something");
		expect(await screen.findByText(emailInvalidError)).toBeInTheDocument();

		setupValidForm();
		submitForm();

		await waitForElementToBeRemoved(screen.queryByText(emailInvalidError));
		expect(screen.queryByText(passwordRequiredError)).not.toBeInTheDocument();
	});

	it("should call mutation with { email, password } when Login button is clicked", async () => {
		mockLoginMutation.mockReturnValue({ unwrap: () => Promise.resolve() });
		render(<LoginScreen />);

		setupValidForm();
		submitForm();

		await waitFor(() =>
			expect(mockLoginMutation).toHaveBeenCalledWith({
				email: "something@example.com",
				password: "test123",
			})
		);
	});

	it("should call mutation and show error on a 401 response when Login button is clicked", async () => {
		mockLoginMutation.mockReturnValue({
			unwrap: () => Promise.reject({ status: 401, data: "sample error message" }),
		});
		render(<LoginScreen />);

		setupValidForm();
		submitForm();

		await waitFor(() =>
			expect(mockLoginMutation).toHaveBeenCalledWith({
				email: "something@example.com",
				password: "test123",
			})
		);

		expect(screen.getByText(/sample error message/i));
	});
});
