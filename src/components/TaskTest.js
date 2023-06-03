import React, { useState } from 'react';
import CustomTextField from './CustomTextField';
import CustomRadioButton from './CustomRadioButton';
import CustomCheckBox from './CustomCheckBox';
import CustomButton from './CustomButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function BasicTextFields() {
  const [formState, setFormState] = useState({
    first: '',
    last: '',
    contact: '',
    email: '',
    gender: '',
    check: false,
    errors: {
      first: '',
      last: '',
      contact: '',
      email: '',
    },
  });

  const theme = createTheme({
    palette: {
      neutral: {
        main: '#004236',
        contrastText: '#fff',
      },
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: '',
      },
    }));
  }

  function handleGender(e) {
    setFormState((prevState) => ({
      ...prevState,
      gender: e.target.value,
      errors: {
        ...prevState.errors,
        gender: '',
      },
    }));
  }

  function handleCheck() {
    setFormState((prevState) => ({
      ...prevState,
      check: !prevState.check,
    }));
  }

  function validateForm() {
    const { first, last, contact, email, gender } = formState;
    const errors = {};

    if (!/^[a-zA-Z]+$/.test(first)) {
      errors.first = 'Enter a Valid Name';
    }

    if (!/^[a-zA-Z]+$/.test(last)) {
      errors.last = 'Enter a Valid Name';
    }

    if (!/^[0-9]{10}$/.test(contact)) {
      errors.contact = 'Enter a Valid Contact No.';
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = 'Enter a Valid Email';
    }

    if (!gender) {
      errors.gender = 'Select a Gender';
    }

    setFormState((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        ...errors,
      },
    }));

    return Object.keys(errors).length === 0;
  }

  function handleClick() {
    const isValid = validateForm();

    if (!isValid) {
      alert('Please fill all details correctly.');
    } else if (!formState.check) {
      alert('Please accept the Terms and Conditions');
    } else {
      console.log('Submitted');
    }
  }

  const {
    first,
    last,
    contact,
    email,
    gender,
    check,
    errors: {
      first: firstError,
      last: lastError,
      contact: contactError,
      email: emailError,
      gender: genderError,
    },
  } = formState;

  return (
    <div>
      <h1>React MUI Form</h1>
      <CustomTextField
        required
        id="filled-required"
        name="first"
        label="First Name"
        placeholder="First Name"
        onChange={handleChange}
        variant="filled"
        value={first}
        error={Boolean(firstError)}
        helperText={firstError}
      />
      <br />
      <br />
      <CustomTextField
        required
        id="filled-required"
        name="last"
        label="Last Name"
        placeholder="Last Name"
        onChange={handleChange}
        variant="filled"
        value={last}
        error={Boolean(lastError)}
        helperText={lastError}
      />
      <br />
      <br />
      <CustomTextField
        required
        id="filled-required"
        name="contact"
        label="Contact No."
        placeholder="Contact No."
        onChange={handleChange}
        variant="filled"
        value={contact}
        error={Boolean(contactError)}
        helperText={contactError}
      />
      <br />
      <br />
      <CustomTextField
        required
        id="filled-required"
        name="email"
        label="Email"
        type="email"
        autoComplete="Email"
        placeholder="Email"
        onChange={handleChange}
        variant="filled"
        value={email}
        error={Boolean(emailError)}
        helperText={emailError}
      />
      <br />
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="gender"
          value={gender}
          onChange={handleGender}
        >
          <FormControlLabel
            value="female"
            control={<CustomRadioButton />}
            label="Female"
          />
          <FormControlLabel
            value="male"
            control={<CustomRadioButton />}
            label="Male"
          />
          <FormControlLabel
            value="other"
            control={<CustomRadioButton />}
            label="Other"
          />
        </RadioGroup>
        {Boolean(genderError) && <span>{genderError}</span>}
      </FormControl>

      <br />

      <FormControlLabel
        required
        control={<CustomCheckBox />}
        label="Accept All Terms and Conditions"
        checked={check}
        onClick={handleCheck}
      />

      <br />
      <ThemeProvider theme={theme}>
        <CustomButton
          type="submit"
          variant="contained"
          color="neutral"
          onClick={handleClick}
        >
          Submit
        </CustomButton>
      </ThemeProvider>
    </div>
  );
}
