import { createMuiTheme } from "@material-ui/core";
import { red, deepPurple, pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: deepPurple.A400,
		},
		secondary: {
			main: pink.A400,
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#fff",
		},
	},
});

export default theme;