import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import {
	FormControl,
	InputLabel,
	ListSubheader,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";

import BInput from "./BInput";

interface BSelectProps {
	onChange?: (event: any) => any;
	value?: any;
	name?: string;
	label?: string;
	items?: Array<{ label?: string; value: any }>;
	style?: CSSProperties;
	error?: any;
	isPaginated?: boolean;
	selectContainerStyle?: any;
	onRequestMore?: (page: number, search?: string) => any;
	hasSearch?: boolean;
	children?: JSX.Element | JSX.Element[] | string
}

const BSelect: FC<BSelectProps> = ({
	onChange,
	value,
	name,
	items,
	label,
	error,
	style,
	isPaginated = false,
	onRequestMore,
	hasSearch = false,
	children,
	selectContainerStyle
}) => {
	const [page, setPage] = useState<number>(1);
	const [search, setSearch] = useState<string>("");
	// const [valueHandler, setValueHandler] = useState<any>(value);
	// // console.log(value);

	// useEffect(() => {
	// 	if(value) setValueHandler(value);
	// }, [value])

	return (
		<FormControl sx={{ marginBlock:2, paddingInline: 0.5, width: "100%", ...selectContainerStyle,  }}>
			<InputLabel>{label}</InputLabel>
			<Select
				// value={valueHandler}
				value={value}
				name={name}
				variant="standard"
				onChange={(event) => {
					onChange && onChange(event);
					// setValueHandler(event.target.value)
				}}
				label={label}
				error={error}
				MenuProps={{ autoFocus: false }}
				style={{ width: "98%", marginInline: "auto",...style,  }}
			>
				<ListSubheader>
					{hasSearch && (
						<BInput
							onChange={(e) => setSearch(e.target.value)}
							value={search}
							label="Buscar"
							type="text"
							autoFocus
							name="search"
							onKeyDown={(e) => {
								if (e.key !== "Escape") {
									// Prevents autoselecting item while typing (default Select behaviour)
									e.stopPropagation();
								}
							}}
						/>
					)}
				</ListSubheader>

				{items &&
					items
						?.filter((item) =>
							item?.label
								?.toLowerCase()
								.includes(search?.toLowerCase()),
						)
						?.map((item, index) => (
							<MenuItem selected={value === item.value} key={index} value={item.value}>
								{item.label || item.value}
							</MenuItem>
						))}

				{isPaginated && (
					<MenuItem
						onClick={(e) => {
							e.preventDefault();
							onRequestMore && onRequestMore(page, search);
							setPage((prev) => prev + 1);
						}}
					>
						Cargar más
					</MenuItem>
				)}
				{children}

			</Select>
		</FormControl>
	);
};

export default BSelect;
