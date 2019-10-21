import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

export default function EventForm({ onSubmit }) {
  console.log('rerender');
  const [selectedStartDate, setSelectedStartDate] = useState(moment());
  const [selectedEndDate, setSelectedEndDate] = useState(moment());
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const handleStartDateChange = date => {
    setSelectedStartDate(date);
    console.log(selectedStartDate);
  };
  const handleEndDateChange = date => {
    setSelectedEndDate(date);
    console.log(setSelectedEndDate);
  };
  const imageToBase64 = e => {
    const element = e.target;
    const file = element.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      setCoverImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  function submitIfValid() {
    if (description === '') {
      console.log('description is required');
    }
    if (title === '') {
      console.log('title is required');
    }
    if (coverImage === null) {
      console.log('image is required');
    }
    onSubmit({
      cover: coverImage,
      description,
      title,
      startTime: selectedStartDate.valueOf(),
      endTime: selectedEndDate.valueOf(),
    });
  }
  return (
    <React.Fragment>
      <label htmlFor="raised-button-file">
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={imageToBase64}
        />
        <Button variant="text" fullWidth component="span">
          Upload Event Cover Image
        </Button>
      </label>
      <TextField
        id="outlined-full-width"
        label="Title"
        style={{ margin: 8 }}
        placeholder="Event Title"
        helperText=""
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
      />
      <TextField
        id="outlined-full-width"
        label="Description"
        style={{ margin: 8 }}
        placeholder="Event Description"
        multiline
        rows={5}
        helperText=""
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }}
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/YYYY"
            margin="normal"
            id="date-picker-inline"
            label="Starting Date"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Starting Time"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/YYYY"
            margin="normal"
            id="date-picker-inline"
            label="Ending Date"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Ending Time"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <Button onClick={submitIfValid} variant="contained" fullWidth color="primary">
        Post New Event
      </Button>
    </React.Fragment>
  );
}
