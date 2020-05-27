import React from "react";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";
import withAuth from "./WithAuth";
import firebase from "../lib/firebase";
import {
	Container,
	Box,
	Divider,
	TextField,
	InputAdornment,
	Typography,
} from "@material-ui/core";
import styles from "./search.module.scss";

import SearchIcon from "@material-ui/icons/Search";

function Search() {
	const onSearchBoxChange = (e) => {
		console.log(e.currentTarget.value);
	};

	return (
		<>
			<NavBar title="Search" />
			<Container maxWidth="md">
				<Box my={4} textAlign="center">
					<TextField
						className={styles.searchBox}
						variant="filled"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
						onChange={onSearchBoxChange}
					/>
					<div className={styles.searchResultBox}>
						<Typography
							color="textSecondary"
							display="block"
							variant="caption"
						>
							People
						</Typography>
						<Divider />
					</div>
					<div className="searchResultBox">
						<Typography
							color="textSecondary"
							display="block"
							variant="caption"
						>
							Groups
						</Typography>
						<Divider />
					</div>
				</Box>
			</Container>
			<BottomNavBar selected={1} />
		</>
	);
}

const SearchAuthed = withAuth(Search);
export default SearchAuthed;
