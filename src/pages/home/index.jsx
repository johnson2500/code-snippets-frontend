/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  Select, MenuItem, InputLabel, Typography,
} from '@material-ui/core';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { CODE_LANGUAGES } from '../../helpers/constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const { appState, setAppState } = props;

  const { home, editorSnippet } = appState;
  const { scratchPad } = home;

  // Code Editor Variables
  const [codeState, setCodeState] = React.useState();
  const [languageState, setLanguageState] = React.useState();

  const handleLanguageChange = (e) => {
    setLanguageState(e.target.value);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4">Scratch Pad</Typography>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              value={languageState}
              onChange={handleLanguageChange}
              label="Language"
              className={classes.fillContainer}
            >
              {
                CODE_LANGUAGES.map((lang) => <MenuItem value={lang}>{lang}</MenuItem>)
              }
            </Select>
            <CodeEditor
              disabled={false}
              value={codeState}
              language={languageState}
              placeholder={`Enter ${languageState} here.`}
              onChange={(evn) => setCodeState(evn.target.value)}
              padding={15}
              style={{
                fontSize: 12,
                marginTop: 10,
                backgroundColor: 'black',
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </>
  );
}

Home.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
};

Home.defaultProps = {
  appState: {},
  setAppState: () => {},
};
