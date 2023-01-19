import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableCellProps,
	TableHead,
	TableProps,
	TableRow,
	Typography,
	useTheme,
} from "@mui/material";

import { CSSProperties } from "react";
import { FC } from "react";
import { children } from "../types/Components";

export const cellsAlignment = "left";

export const BCell = ({ ...props }: TableCellProps) => {
	return (
		<TableCell
			{...props}
			align={props?.align || cellsAlignment}
			sx={{ minWidth: 120, ...props.sx }}
			scope="row"
		>
			<Typography
				variant="body2"
				sx={{
					...props.sx,
					textAlign: cellsAlignment,
					width: "100%",
				}}
			>
				{props.children}
			</Typography>
		</TableCell>
	);
};

interface BTableProps extends TableProps {
	children?: children;
	size?: "small" | "medium";
	headings?: string[];
	headingColSpanList?: number[];
	style?: any;
	tableBodyStyle?: CSSProperties;
	headStyle?: CSSProperties;
}
const BTable: FC<BTableProps> = ({
	tableBodyStyle,
	style,
	children,
	headings,
	size = "medium",
	headingColSpanList,
	...props
}) => {
	return (
		<Table stickyHeader size={size} sx={style} {...props}>
			<TableHead
				sx={{
					backgroundColor: "#d4d2d246",
					borderBottom: "1px #212121 solid",
					...props.headStyle,
				}}
			>
				<TableRow style={{ border: "0.5px solid #4f4e4e" }}>
					{headings?.map((heading, index) => (
						<BCell
							key={index}
							style={{
								borderBottom: "2.5px solid #4f4e4e"
							}}
							sx={{ fontWeight: "600" }}
							colSpan={headingColSpanList?.[index] || 1}
						>
							{heading}
						</BCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody sx={tableBodyStyle}>
				<>{children}</>
			</TableBody>
		</Table>
	);
};

export default BTable;
