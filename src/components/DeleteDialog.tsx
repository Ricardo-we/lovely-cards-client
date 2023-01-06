import { Box, Button, Dialog, Typography } from "@mui/material";

import BModal from "./BModal";
import { FC } from "react";
import FlexBox from "./FlexBox";

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
	return (
		<BModal style={{ maxWidth: 500 }} visible={visible} onClose={onClose}>
			<FlexBox direction="column" justify="space-evenly" align="center">
				<Typography
					variant="h4"
					sx={{
						width: "80%",
						textAlign: "center",
						marginBlock: 5,
						margin: "auto",
					}}
				>
					{title ? title : "Está seguro de eliminar este registro?"}
				</Typography>
				<FlexBox style={{marginBlock: 10, width:"100%"}} justify="space-evenly">
					<Button
						variant="outlined"
						color="primary"
						onClick={onClose}
					>
						Cancelar
					</Button>
					<Button
						variant="outlined"
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
