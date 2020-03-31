
import React from "react";
import { useRouter } from "next/router";
import {
	BottomNavigation,
	BottomNavigationAction
} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from '@material-ui/icons/Search';
//import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ListIcon from "@material-ui/icons/List";

export default function BottomNavBar(props) {
	const router = useRouter();
	const [value] = React.useState(props.selected);

	return (
		<BottomNavigation
			value={value}
			showLabels
			className="bottomNav">
			<BottomNavigationAction
				label="Channels"
				icon={<ListIcon />}
				onClick={
					(e) => {
						e.preventDefault()
						router.push("/channels");
					}
				} />
			<BottomNavigationAction
				label="Search"
				icon={<SearchIcon />}
				onClick={
					(e) => {
						e.preventDefault()
						router.push("/search");
					}
				} />
			<BottomNavigationAction
				label="Friends"
				icon={<PersonIcon />}
				onClick={
					(e) => {
						e.preventDefault()
						router.push("/friends")
					}
				} />
		</BottomNavigation>
	);
}