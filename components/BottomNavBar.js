
import React from "react";
import { useRouter } from "next/router";
import {
	BottomNavigation,
	BottomNavigationAction
} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from "@material-ui/icons/List";

import styles from "./BottomNavBar.module.scss";

export default function BottomNavBar(props) {
	const router = useRouter();
	const [value] = React.useState(props.selected);

	return (
		<BottomNavigation
			value={value}
			showLabels
			className={styles.bottomNav}>
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