import { Button, ButtonProps } from "@mui/material";
import { CSSProperties, FC, MouseEvent } from "react";

interface BButtonProps extends ButtonProps {
	children: JSX.Element | JSX.Element[] | string | string[];
	style?: CSSProperties;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => any;
	color?:
		| "inherit"
		| "primary"
		| "secondary"
		| "success"
		| "error"
		| "info"
		| "warning";
}

const BButton: FC<BButtonProps> = ({
	children,
	onClick,
	style,
	color,
	...props
}) => {
	return (
		<Button
			{...props}
			variant="outlined"
			onClick={onClick}
			style={style}
			color={color}
		>
			{children}
		</Button>
	);
};

export default BButton;
