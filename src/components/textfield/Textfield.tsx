import { ForwardedRef, forwardRef, HTMLAttributes } from "react";

type TextfieldProps = HTMLAttributes<HTMLInputElement>;

const Textfield = forwardRef((props: TextfieldProps, ref: ForwardedRef<HTMLInputElement>) => {
	return <input {...props} ref={ref} />;
});

export default Textfield;
