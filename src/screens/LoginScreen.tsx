import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import LoginForm from "components/login-form/LoginForm";
import { IAuthenticateMutationParams } from "models/auth";
import { useState } from "react";
import { useLoginMutation } from "services/auth";

const LoginScreen = () => {
	const [loginError, setLoginError] = useState<string | null>(null);
	const [loginMutation] = useLoginMutation();

	const handleFormSubmit = (data: IAuthenticateMutationParams) => {
		loginMutation(data)
			.unwrap()
			.then((token) => {
				localStorage.setItem("token", token);
				loginError && setLoginError(null);
			})
			.catch((err: FetchBaseQueryError) => {
				setLoginError(err.data as string);
			});
	};

	return (
		<div>
			<LoginForm onSubmit={handleFormSubmit} />
			{loginError && <span className="error-helper">{loginError}</span>}
		</div>
	);
};

export default LoginScreen;
