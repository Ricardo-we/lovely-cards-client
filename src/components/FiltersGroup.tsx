import BInput from "./fields/BInput";
import BRadioGroup from "./fields/BRadioGroup";
import { FC } from "react";
import { children } from "../types/Components";

interface RadioGroupProps {
	radioOptions?: string[];
	onFilter?: (e: any) => any,
	onFilterByChange?: (e: any) => any;
	filterValue?: any;
	filterByValue?: any;
	children?: children;
	radioLabel?: string;
	hideSearchBar?: boolean;
}

/***
 * @options string, is possible to use this syntax "Label:value" or "value" if you just use the value is gonna use it as label
 * @type "radio" | "checkbox" | "range"
 * @onChange onChange function
 */
const FilterGroup: FC<RadioGroupProps> = ({
	radioOptions,
	onFilter,
	onFilterByChange,
	filterValue,
	filterByValue,
	children,
	radioLabel,
	hideSearchBar
}) => {
	return (
		<div
		>
			<BRadioGroup
				value={filterByValue}
				label={radioLabel || "Filtrar por"}
				sx={{width: "100%",}}
				options={radioOptions}
				onChange={(e) => onFilterByChange && onFilterByChange(e.target.value)}
			/>
			{!hideSearchBar && <BInput
				label="Buscar"
				onChange={(e) => onFilter && onFilter(e.target.value)}
				value={filterValue}
				style={{ width: "100%", marginBottom: 10 }}
			/>}
			{children}
		</div>
	);
};

export default FilterGroup;
