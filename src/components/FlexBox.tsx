import { FC, HTMLAttributes } from "react";

interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {
	direction?: "row" | "row-reverse" | "column" | "column-reverse";
	align?: "center" | "flex-start" | "flex-end";
	wrap?: "wrap" | "nowrap" | "wrap-reverse";
	justify?:
		| "space-evenly"
		| "space-between"
		| "space-around"
		| "flex-start"
		| "flex-end"
		| "center";
}

const FlexBox: FC<FlexBoxProps> = ({
	direction="row",
	align="center",
	wrap = "wrap",
	justify="space-evenly",
	style,
    ...props
}) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: direction,
				alignItems: align,
				flexWrap: wrap,
				justifyContent: justify,
                ...style,
			}}
            {...props}
		>
            {props.children}
        </div>
	);
};

export default FlexBox;
