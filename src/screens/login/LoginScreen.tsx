import './LoginScreen.sass';
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import LoginForm from "components/login-form/LoginForm";
import { IAuthenticateMutationParams } from "models/auth";
import { useState } from "react";
import { useLoginMutation } from "services/auth";
import { useDispatch } from 'react-redux';
import { setToken } from 'store/reducers/authSlice';

const LoginScreen = () => {
	const dispatch = useDispatch();
	const [loginError, setLoginError] = useState<string | null>(null);
	const [loginMutation, { isLoading }] = useLoginMutation();

	const handleFormSubmit = (data: IAuthenticateMutationParams) => {
		loginMutation(data)
			.unwrap()
			.then((token) => {
				dispatch(setToken(token));
				loginError && setLoginError(null);
			})
			.catch((err: FetchBaseQueryError) => {
				setLoginError(err.data as string);
			});
	};

	return (
		<div className="login-screen-root screen">
			<LoginForm onSubmit={handleFormSubmit} isLoading={isLoading} />
			{loginError && <span className="error-helper">{loginError}</span>}
		</div>
	);
};

export default LoginScreen;
