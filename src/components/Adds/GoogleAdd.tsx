import { FC, useEffect } from "react";

import { Adsense } from "@ctrl/react-adsense";
import Head from "next/head";
import Script from "next/script";

interface GoogleAddProps {}

const GoogleAdd: FC<GoogleAddProps> = () => {
	return (
		<>
			<Head>
            {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1781111148404359"
     crossorigin="anonymous"></script> */}
				<Script
                    async 
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1781111148404359"
					data-ad-client="ca-pub-1781111148404359"
                    slot="7309166307"
					// crossorigin="anonymous"
					onError={console.error}
				/>
			</Head>
			<Adsense
				responsive="true"
				adTest="on"
				client="ca-pub-1781111148404359"
				slot="7309166307"
			/>
			{/* <Adsense adTest="on" client="ca-pub-XXXXXXXXXX" slot="XXXXXXXXX" /> */}
		</>
	);
};

export default GoogleAdd;
