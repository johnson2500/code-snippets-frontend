import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import image from '../../assets/hero.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridContainer: {
    width: '50%',
  },
  paddedContainer: {
    padding: 10,
  },
  image: {
    width: '100%',
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const history = useHistory();

  const checkItOutHandler = () => {
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2} />
        <Grid item xs={8} className={classes.flex}>
          <div className={classes.gridContainer}>
            <img className={classes.image} alt="test" src={image} />
          </div>
          <div className={classes.gridContainer}>
            <div className={classes.paddedContainer}>
              <Typography variant="h3">The Best Place To Save and Share Code</Typography>
              <Typography variant="body1">
                Save and share code amognst teams. Save files or just small snippets of code that
                you use all the time.
              </Typography>
              <br />
              <Typography variant="body1">
                Save and share code amognst teams. Save files or just small snippets of code that
                you use all the time.
              </Typography>
              <br />
              <br />
              <br />
              <br />
              <Button color="primary" variant="contained" onClick={checkItOutHandler}>Check It Out Now</Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2} />
        <Grid item xs={4} className={classes.flex}>
          <Typography variant="h4">
            Share Code
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.flex}>
          <Typography variant="h4">
            Save Code
          </Typography>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </div>
  );
}
