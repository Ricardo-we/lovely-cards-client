import { FC, useEffect } from "react";

import { APP_CONFIG } from "../../config/app-settings";
import { Adsense } from "@ctrl/react-adsense";
import Head from "next/head";
import Script from "next/script";

interface GoogleAddProps {}

const GoogleAdd: FC<GoogleAddProps> = () => {
	return (
		<>
			<ins
				className="adsbygoogle"
				// style="display:block"
				style={{display: "inline-block"}}
				data-ad-client={APP_CONFIG.GOOGLE_ADDS.dataClient}
				data-ad-slot={APP_CONFIG.GOOGLE_ADDS.slot}
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
			
			<script
				dangerouslySetInnerHTML={{__html:`
					(adsbygoogle = window.adsbygoogle || []).push({});	
				`}}
			/>
			
		</>
	);
};

export default GoogleAdd;
