import { Box, Button, Dialog, Typography, useTheme } from "@mui/material";

import BModal from "./BModal";
import { FC } from "react";
import FlexBox from "./FlexBox";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface DeleteDialogProps {
	title?: string;
	onDeleteItem?: () => any;
	onClose?: () => any;
	visible: boolean;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
	title,
	onDeleteItem,
	onClose = () => {},
	visible,
}) => {
	const { palette } = useTheme();

	return (
		<BModal
			style={{
				maxWidth: 500,
				maxHeight: "400px",
				backgroundColor: palette.warning.main,
			}}
			visible={visible}
			onClose={onClose}
		>
			<FlexBox
				style={{ width: "100%", height: "100%" }}
				direction="column"
				justify="space-evenly"
				align="flex-start"
			>
				<FlexBox
					style={{
						width: "80px",
						height: "80px",
						borderRadius: "100%",
						marginInline: "auto",
						border: "5px solid "+ palette.common.white,
						padding: "15px"
					}}
					align="center"
					justify="center"
				>
					<WarningAmberIcon  style={{ fontSize: "40px", color: palette.common.white }} />
				</FlexBox>

				<Typography
					variant="h5"
					sx={{
						width: "80%",
						textAlign: "center",
						marginBlock: 2,
						marginInline: "auto",
						color: palette.common.white,
					}}
				>
					{title ? title : "Está seguro de eliminar este registro?"}
				</Typography>

				<FlexBox
					style={{ marginBlock: 10, width: "100%" }}
					justify="space-evenly"
				>
					<Button
						variant="contained"
						color="primary"
						onClick={onClose}
					>
						Cancelar
					</Button>
					<Button
						variant="contained"
						color="error"
						onClick={onDeleteItem}
					>
						Confirmar
					</Button>
				</FlexBox>
			</FlexBox>
		</BModal>
	);
};

export default DeleteDialog;
