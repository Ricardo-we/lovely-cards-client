import { CSSProperties, FC, useState } from "react";
import { Collapse, IconButton } from "@mui/material";

import { children } from "../types/Components";

export const CollapseButton = ({
	open,
	toggleOpen,
}: {
	open: boolean;
	toggleOpen: () => any;
}) => {
	return (
		<IconButton
			aria-label="expand row"
			size="small"
			onClick={(e) => {
				e.stopPropagation();
				toggleOpen();
			}}
		>
			{open ? (
				<span className="material-icons">expand_less</span>
			) : (
				<span className="material-icons">expand_more</span>
			)}
		</IconButton>
	);
};


interface CollapseButtonProps {
	children?: children;
	collapseStyle?: CSSProperties;
}

const CollapsableButton: FC<CollapseButtonProps> = ({
	children,
	collapseStyle,
}) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			<CollapseButton
				open={open}
				toggleOpen={() => setOpen((prev) => !prev)}
			/>
			<Collapse sx={collapseStyle} in={open} timeout="auto">
				<>{children}</>
			</Collapse>
		</>
	);
};

export default CollapsableButton;