/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {
  Typography, InputLabel, Select, MenuItem, FormControl,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    minHeight: '30vh',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}));

export default function Settings(props) {
  const classes = useStyles();

  const { settings } = props;
  const { userName, theme, defaultLanguage } = settings;

  const [userNameState, setUserNameState] = React.useState();
  const [themeState, setThemeState] = React.useState();
  const [defaultLanguageState, setDefaultLanguageState] = React.useState();

  const onClickHandler = () => {
    console.log(settings);

    console.log(userNameState);
    console.log(themeState);
    console.log(defaultLanguageState);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h2">Settings</Typography>
            <TextField
              label="Username"
              value={userName}
              onChange={(e) => setUserNameState(e.target.value)}
              className={classes.formControl}
            />
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">Default Theme</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={theme}
                onChange={(e) => setThemeState(e.target.value)}
                style={{ width: '100%' }}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            </FormControl>
            <br />
            <TextField
              label="Default Language"
              value={defaultLanguage}
              onChange={(e) => setDefaultLanguageState(e.target.value)}
              className={classes.formControl}
            />
            <br />
            <Button
              variant="contained"
              onClick={onClickHandler}
            >
              Save
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

Settings.propTypes = {
  settings: PropTypes.object,
};

Settings.defaultProps = {
  settings: {},
};
