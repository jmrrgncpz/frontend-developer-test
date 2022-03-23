import './Button.sass';
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";
import { classnames } from "utils/classname";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "light" | "dark";
};

const Button = forwardRef(
	(
		{ variant = "primary", children, ...rest }: ButtonProps,
		ref: ForwardedRef<HTMLButtonElement>
	) => {
		return (
			<button className={classnames(variant, "button")} {...rest} ref={ref}>
				{" "}
				{children}{" "}
			</button>
		);
	}
);

export default Button;
