import { FC, useEffect } from "react";

import { APP_CONFIG } from "../../config/app-settings";
import { Adsense } from "@ctrl/react-adsense";
import Head from "next/head";
import Script from "next/script";
import { useWindow } from "../../hooks/useWindow";

interface GoogleAddProps {}

const GoogleAdd: FC<GoogleAddProps> = () => {
	useEffect(() => {
		if (!window || window.adsbygoogle.loaded) return
		window.adsbygoogle = window.adsbygoogle || []
		if(window.adsbygoogle?.push) window.adsbygoogle?.push({});
	}, []);

	return (
		// <Adsense
		// 	client={APP_CONFIG.GOOGLE_ADDS.dataClient as string}
		// 	slot={APP_CONFIG.GOOGLE_ADDS.slot as string}
		// 	adTest={"on"}
		// 	className="adsbygoogle"
		// 	responsive="true"
		// 	// format="fluid"
		// 	style={{display: "block!important"}}
		// />
		// <div id="Adscode" style={{width: "100%"}}>
			<ins
				className="adsbygoogle"
				// style="display:block"
				style={{ width: "100%" }}
				data-ad-client={APP_CONFIG.GOOGLE_ADDS.dataClient}
				data-ad-slot={APP_CONFIG.GOOGLE_ADDS.slot}
				data-ad-layout="in-article"
				data-ad-format="fluid"
				data-full-width-responsive="true"
			></ins>
		// </div>
	);
};

export default GoogleAdd;
