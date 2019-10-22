import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

export default function EventForm({ onSubmit }) {
  const [selectedStartDate, setSelectedStartDate] = useState(moment());
  const [selectedEndDate, setSelectedEndDate] = useState(moment());
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [formError, setFormError] = useState({});

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = date => {
    setSelectedEndDate(date);
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
    setFormError({});
    let errors = {};
    let valid = true;
    if (description === '') {
      errors = { ...errors, description: 'description is required' };
      valid = false;
    }
    if (title === '') {
      errors = { ...errors, title: 'title is required' };
      valid = false;
    }
    if (moment(selectedStartDate) >= moment(selectedEndDate)) {
      errors = { ...errors, date: "start time can't be equal or bigger than end time" };
      valid = false;
    }
    if (coverImage === null) {
      errors = { ...errors, coverImage: 'coverImage is required' };
      valid = false;
    }

    if (!valid) {
      setFormError(errors);
      return;
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
        <FormHelperText error={!!formError.coverImage} style={{ marginBottom: '6px' }}>
          {formError.coverImage}
        </FormHelperText>
      </label>
      <TextField
        id="outlined-full-width"
        label="Title"
        style={{ margin: 8 }}
        placeholder="Event Title"
        helperText={formError.title}
        error={!!formError.title}
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
        error={!!formError.description}
        multiline
        rows={3}
        helperText={formError.description}
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
      <FormHelperText error={!!formError.date} style={{ marginBottom: '6px' }}>
        {formError.date}
      </FormHelperText>

      <Button onClick={submitIfValid} variant="contained" fullWidth color="primary">
        Post New Event
      </Button>
    </React.Fragment>
  );
}
