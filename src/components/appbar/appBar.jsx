/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-constant-condition */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import CodeIcon from '@material-ui/icons/Code';

export default function Header(props) {
  const { leftOffset = 200 } = props;

  const useStyles = makeStyles(() => ({
    appBar: {
      width: `calc(100% - ${leftOffset}px)`,
      marginLeft: leftOffset,
    },
  }));

  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <CodeIcon />
        <Typography variant="h6" className={classes.title}>
          Code Snippets
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  leftOffset: PropTypes.number,
};

Header.defaultProps = {
  leftOffset: 200,
};
