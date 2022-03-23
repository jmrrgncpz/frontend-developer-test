import Textfield from "../components/textfield/Textfield";

const LoginScreen = () => {
	return (
		<div>
			<h1>Login</h1>
			<Textfield inputAdornmentName="email" placeholder="Email Address" />
			<Textfield inputAdornmentName="new_releases" placeholder="Password" />
		</div>
	);
};

export default LoginScreen;
