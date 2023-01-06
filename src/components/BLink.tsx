import { FC, HTMLAttributes } from "react";

import Link from "next/link";

interface BLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    to: string;
}
 
const BLink: FC<BLinkProps> = ({ to, ...props }) => {
    return ( 
        <Link href={to} legacyBehavior>
            <a {...props}/>
        </Link>
    );
}
 
export default BLink;