import {
	List,
	ListItem,
	ListItemButton,
	ListItemButtonProps,
	ListItemProps,
	ListItemText,
	ListProps,
} from "@mui/material";

import { FC } from "react";

interface BListProps extends ListProps {}

const BList: FC<BListProps> = ({ ...props }) => {
	return <List {...props} />;
};

interface BListItemProps extends ListItemProps {}

export const BListItem: FC<BListItemProps> = ({
	children,
	...props
}) => {
	return (
		<ListItem {...props}>
			{children}
		</ListItem>
	);
};

interface BListItemButtonProps extends ListItemProps {
	mainText?: string;
	secondaryText?: string;
	onClick?: (event: any) => any;
	listItemButtonProps?: ListItemButtonProps;
}

export const BListItemButton: FC<BListItemButtonProps> = ({
	mainText,
	secondaryText,
	children,
	listItemButtonProps,
	...props
}) => {
	return (
		<BListItem {...props}>
			<ListItemButton
				onClick={props.onClick}
				{...listItemButtonProps}
			>
				{mainText || secondaryText ? (
					<ListItemText
						primary={mainText}
						secondary={secondaryText}
					/>
				) : null}
				{children}
			</ListItemButton>
		</BListItem>
	);
};

export default BList;
