import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

function DrawerBar() {
  const history = useHistory();
  return (
    <>
      <List>
        <ListItem
          button
          onClick={() => { history.push('/'); }}
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          onClick={() => { history.push('/tasks'); }}
        >
          <ListItemText primary="Tasks" />
        </ListItem>
      </List>
      <Divider />
    </>
  );
}

DrawerBar.propTypes = {
};

DrawerBar.defaultProps = {
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(DrawerBar);
