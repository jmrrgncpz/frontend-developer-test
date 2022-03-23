import { HTMLAttributes } from "react";
import { classnames } from "utils/classname";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "light" | "dark";
};

const Button = ({ variant = "primary", ...rest }: ButtonProps) => {
	return <button className={classnames(variant, "button")} {...rest} />;
};

export default Button;
