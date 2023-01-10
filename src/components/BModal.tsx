import { Box, Button, Modal, Typography } from "@mui/material";
import { CSSProperties, FC, useEffect } from "react";

import { useWindow } from "../hooks/useWindow";

interface BModalProps {
	visible: boolean;
	onClose: () => any;
	style?: CSSProperties
    children?: JSX.Element | JSX.Element[];
}

const BModal: FC<BModalProps> = ({ visible, onClose, children, style }) => {
	const windowObj: any = useWindow();

	return (
		<Modal
			open={visible}
			onClose={onClose}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minWidth: windowObj?.screen?.width >= 800 ? "600px" : "200px",
				width: "80%",
				maxWidth: "800px",
				marginInline: "auto",
				maxHeight: "80vh",
				marginBlock: "auto"
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "space-evenly",
					width: "100%",
					outline: "none",
					overflowY: "auto",
					height: "100%",
					borderRadius: 5,
					padding: 1,
					...style
				}}
				bgcolor="white"
			>
                {children}
            </Box>
		</Modal>
	);
};

export default BModal;
