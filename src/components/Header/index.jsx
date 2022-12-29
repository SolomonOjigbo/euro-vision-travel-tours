import {
	AppBar,
	Autocomplete,
	InputBase,
	Toolbar,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import useStyles from "./styles";
import { Search } from "@mui/icons-material";

const Header = ({ onPlaceChanged, onLoad }) => {
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Toolbar className={classes.toolbar}>
				<Typography variant="h5" className={classes.title}>
					Travel Advisor
				</Typography>
				<Box display="flex">
					<Typography variant="h6" className={classes.title}>
						Explore new Places
					</Typography>
					{/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<Search />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{ root: classes.inputRoot, input: classes.inputInput }}
						/>
					</div>
					{/* </Autocomplete> */}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
