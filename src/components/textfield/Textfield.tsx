import "./Textfield.sass";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

type TextfieldProps = InputHTMLAttributes<HTMLInputElement> & {
	inputAdornmentName: string;
	error?: string;
};

const Textfield = forwardRef(
	({ inputAdornmentName, error, ...rest }: TextfieldProps, ref: ForwardedRef<HTMLInputElement>) => {
		return (
			<div className="textfield-root">
				<div className="textfield-input">
					<span className="material-icons textfield-input-adornment">{inputAdornmentName}</span>
					<input {...rest} ref={ref} />
				</div>
				{error && <span className="error-helper">{error}</span>}
			</div>
		);
	}
);

export default Textfield;
