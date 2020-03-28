
import React from "react";
import { useRouter } from "next/router";
import {
	BottomNavigation,
	BottomNavigationAction
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

export default function BottomNavBar(props) {
	const router = useRouter();
	const [value] = React.useState(props.selected);

	return (
		<BottomNavigation
			value={value}
			showLabels
			className="bottomNav">
			<BottomNavigationAction
				label="Dashboard"
				icon={<DashboardIcon />}
				onClick={
					(e) => {
						e.preventDefault()
						router.push("/dashboard")
					}
				} />
			<BottomNavigationAction label="" icon={<RadioButtonUncheckedIcon />} />
			<BottomNavigationAction label="" icon={<RadioButtonUncheckedIcon />} />
		</BottomNavigation>
	);
}