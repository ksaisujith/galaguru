'use client'

import React, { useState, ChangeEvent } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Typography, Box } from '@mui/material';

const steps = ['Personal Information', 'Gala guru roles', 'Review'];

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  userType: number;
  dob: string;
  review?: string;
}

const StepperForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    userType: 1,
    dob:'',
    review: ''
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Handle form submission
      console.log('Form data submitted:', formData);
    } else {
      setActiveStep(prevStep => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="phoneNumber"
              label="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              name="userType"
              label="User Type"
              value={formData.userType}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="dob"
              label="Date of birth"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6">Review Your Information</Typography>
            <Typography>Name: {formData.name}</Typography>
            <Typography>Email: {formData.email}</Typography>
            <Typography>Phone number: {formData.phoneNumber}</Typography>
            <Typography>Address: {formData.userType}</Typography>
            <Typography>City: {formData.dob}</Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ p: 2 }}>
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StepperForm;

