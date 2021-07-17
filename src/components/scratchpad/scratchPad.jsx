import React from 'react';
import {
  Paper, Grid, Select, Typography, MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { CODE_LANGUAGES } from '../../helpers/constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 300,
  },
}));

export default function CodeScratchPad(props) {
  console.log(props);
  const classes = useStyles();
  const [languageState, setLanguageState] = React.useState('javascript');
  const [codeState, setCodeState] = React.useState();

  const handleLanguageChange = (e) => {
    setLanguageState(e.target.value);
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h4">
            Scratch Pad
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Select
            labelId="language-select-label"
            value={languageState}
            onChange={handleLanguageChange}
            label="Language"
            className={classes.fillContainer}
          >
            {
                CODE_LANGUAGES.map((lang) => <MenuItem key={lang} value={lang}>{lang}</MenuItem>)
            }
          </Select>
        </Grid>
      </Grid>
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
          height: '80%',
          backgroundColor: 'black',
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </Paper>
  );
}
