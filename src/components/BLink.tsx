import { FC, HTMLAttributes } from "react";

import Link from "next/link";

interface BLinkProps extends HTMLAttributes<HTMLAnchorElement> {
	to: string;
}

const BLink: FC<BLinkProps> = ({ to, ...props }) => {
	return (
		<Link
			href={to}
			onClick={(e) => e.stopPropagation()}
			passHref
			legacyBehavior
		>
			<a
				onClick={(e) => {
                    e.nativeEvent.stopImmediatePropagation()
                    e.stopPropagation()
                    e.preventDefault()
                }}
				{...props}
			>
				{props.children}
			</a>
		</Link>
	);
};

export default BLink;
