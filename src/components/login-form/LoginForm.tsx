import "./LoginForm.sass";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "./loginFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAuthenticateMutationParams } from "models/auth";
import Textfield from "components/textfield/Textfield";
import Button from "components/button/Button";

type LoginFormProps = {
	onSubmit: (data: IAuthenticateMutationParams) => void;
	isLoading: boolean;
};

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
		resolver: yupResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<form className="login-form" onSubmit={handleSubmit(onSubmit)}>
			<h1>Login</h1>
			<div className="fields">
				<Textfield
					{...register("email")}
					inputAdornmentName="email"
					placeholder="Email Address"
					error={errors["email"] && errors["email"].message}
				/>
				<Textfield
					{...register("password")}
					inputAdornmentName="new_releases"
					placeholder="Password"
					error={errors["password"] && errors["password"].message}
					type="password"
				/>
			</div>
			<Button type="submit" disabled={isLoading}>
				{isLoading ? "Logging in" : "Log In"}
			</Button>
		</form>
	);
};

export default LoginForm;
