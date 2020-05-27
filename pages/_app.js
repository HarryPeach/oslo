import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import "../src/css/core.scss";
import * as Constants from "../src/_constants";

export default class MyApp extends App {
	componentDidMount() {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<React.Fragment>
				<CssBaseline />
				<Head>
					<title>{Constants.APP_NAME}</title>
					<link
						rel="shortcut icon"
						type="image/x-icon"
						href="bear.svg"
					/>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width"
					/>
				</Head>
				<StylesProvider injectFirst>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</StylesProvider>
			</React.Fragment>
		);
	}
}
