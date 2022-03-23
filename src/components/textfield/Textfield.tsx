import "./Textfield.sass";
import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";

type TextfieldProps = HTMLAttributes<HTMLInputElement> & {
	inputAdornmentName: string;
};

const Textfield = forwardRef(({ inputAdornmentName, ...rest}: TextfieldProps, ref: ForwardedRef<HTMLInputElement>) => {
	return (
		<div className="textfield-root">
			<span className="material-icons textfield-input-adornment">{inputAdornmentName}</span>
			<input className="textfield-input" {...rest} ref={ref} />
		</div>
	);
});

export default Textfield;
