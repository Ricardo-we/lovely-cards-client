import { FC, useEffect } from "react";

import { APP_CONFIG } from "../../config/app-settings";
import { Adsense } from "@ctrl/react-adsense";
import Head from "next/head";
import Script from "next/script";

interface GoogleAddProps {}

const GoogleAdd: FC<GoogleAddProps> = () => {
	return (
		<>
			<Script
				async
				src={APP_CONFIG.GOOGLE_ADDS.src}
				data-ad-client={APP_CONFIG.GOOGLE_ADDS.dataClient}
				slot={APP_CONFIG.GOOGLE_ADDS.slot}
				// crossorigin="anonymous"
				onError={console.error}
			/>
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
