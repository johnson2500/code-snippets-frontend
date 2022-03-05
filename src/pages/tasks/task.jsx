import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Label from '@mui/icons-material/Label';
import Attachment from '@material-ui/icons/AttachFile';
import Calender from '@material-ui/icons/CalendarTodayOutlined';
import {
  Avatar, Divider, Typography, Button,
} from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function BasicDateTimePicker() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}

function CommentItem() {
  return (
    <Box>
      <Grid container spacing={4} style={{ padding: 10 }}>
        <Grid item xs={1} md={1}>
          <Avatar />
        </Grid>
        <Grid item xs={11} md={11}>
          Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit
          Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit
          Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
}

function CommentsList() {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Typography variant="h6">Comments</Typography>
      <Grid container spacing={4} style={{ padding: 10 }}>
        <Grid item xs={1} md={1}>
          <Avatar />
        </Grid>
        <Grid item xs={10} md={10}>
          <TextField minRows={4} multiline style={{ width: '100%' }} />
          <Button label="Comment">Add Comment</Button>
        </Grid>
      </Grid>
      <Divider />
      {
        [1, 2, 3].map(() => <CommentItem />)
      }
    </Box>
  );
}

function SideList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List disablePadding style={{ width: '100%' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Calender />
              </ListItemIcon>
              <BasicDateTimePicker />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Label />
              </ListItemIcon>
              <ListItemText primary="Label" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Attachment />
              </ListItemIcon>
              <ListItemText primary="Attachments" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

function BasicNotePad() {
  return (
    <TextField
      id="outlined-multiline-flexible"
      label="Notes"
      multiline
      maxRows={12}
      minRows={12}
      value="value"
      style={{ width: '100%', marginTop: 20 }}
    />
  );
}

export default function FullWidthGrid() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={8}>
        <BasicNotePad />
        <CommentsList comments={[0, 1, 2, 3]} />
      </Grid>
      <Grid item xs={6} md={4}>
        <SideList />
      </Grid>
    </Grid>
  );
}
