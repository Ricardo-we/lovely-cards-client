import { Button, ButtonProps, Tooltip } from "@mui/material";
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
	title,
	...props
}) => {
	if (title)
		return (
			<Tooltip title={title}>
				<Button
					onClick={onClick}
					style={{ ...style }}
					color={color}
					{...props}
				>
					{children}
				</Button>
			</Tooltip>
		);
		
	return (
		<Button onClick={onClick} style={{ ...style }} color={color} {...props} >
			{children}
		</Button>
	);
};

export default BButton;
