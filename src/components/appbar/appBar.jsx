/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-constant-condition */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import CodeIcon from '@material-ui/icons/Code';
import Settings from '@material-ui/icons/Settings';
import { useHistory } from 'react-router-dom';

export default function Header(props) {
  const { leftOffset = 200 } = props;

  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    appBar: {
      width: `calc(100% - ${leftOffset}px)`,
      marginLeft: leftOffset,
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    leftNav: {
      marginLeft: 'auto',
    },
    codeIcon: {
      padding: 10,
    },
  }));

  const classes = useStyles();

  const handleSettingClick = () => {
    history.push('/settings');
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <CodeIcon />
        </IconButton>
        <Typography variant="h5">Code Snippets</Typography>
        <IconButton className={classes.leftNav}>
          <Settings onClick={handleSettingClick} />
        </IconButton>
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
