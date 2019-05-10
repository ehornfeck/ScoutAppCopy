import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import MediaQuery from 'react-responsive';

// Load Zilla Slab typeface
import 'typeface-zilla-slab';

const styles = {
	grow: {
		flexGrow: 1
	},
	barText: {
		fontFamily: "'Zilla Slab'",
		fontWeight: "semibold",
		fontSize: "30px",
		marginTop: "-8px",
		textTransform: "none"
	}
};

function Bar(props) {
	const { classes } = props;
	return (
		<AppBar position="static">
			<Toolbar>
				<Button variant="flat" color="inherit" component={Link} to="/">
					<Typography variant="h6" color="inherit" className={classes.barText}>
						StrangeScout
					</Typography>
				</Button>
				<MediaQuery query='(min-device-width: 500px)'>
					<div className={classes.grow} />
					<Typography variant="h6" color="inherit" className={classes.barText}>
						2019 Deep Space
					</Typography>
				</MediaQuery>
			</Toolbar>
		</AppBar>
	);
}

Bar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Bar);