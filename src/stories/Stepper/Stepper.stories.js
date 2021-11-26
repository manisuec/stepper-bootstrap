import React from 'react';
import { storiesOf } from '@storybook/react';
import Stepper from '../../Stepper/Stepper';

const Step1 = () => {
  return <span className="text-muted">{'Step 1: React component'}</span>;
};

const Step2 = () => (
  <span className="text-muted">{'Step 2: React component'}</span>
);

const Step3 = () => (
  <span className="text-muted">{'Step 3: React component'}</span>
);

// [{stepName: 'step0', stepLabel: '', handleSubmit: '', completed: true}]
const steps = [
  {
    stepHeader: 'Basic Details',
  },
  {
    stepHeader: 'Basic Details',
  },
  {
    stepHeader: 'Basic Details',
  },
];

const getStep = (index, formObj) => {
  switch (index) {
    case 0:
      return (
        <Step1
          key={index}
          stepHeader={'First Header'}
          bodyComponent={formObj}
        />
      );
    case 1:
      return (
        <Step2
          key={index}
          stepHeader={'Second Header'}
          bodyComponent={formObj}
        />
      );
    case 2:
      return (
        <Step3
          key={index}
          stepHeader={'Third Header'}
          bodyComponent={formObj}
        />
      );
    default:
      return null;
  }
};

let activeStep = 0;
const formObj = <div>Test form</div>;

storiesOf('Stepper', Stepper)
  .add('activeStep = 0', () => (
    <Stepper activeStep={activeStep}>
      {steps.map((step, index) => getStep(index, formObj))}
    </Stepper>
  ))
  .add('activeStep = 1', () => (
    <Stepper activeStep={1}>
      {steps.map((step, index) => getStep(index, formObj))}
    </Stepper>
  ))
  .add('activeStep = 2, React component', () => (
    <Stepper activeStep={2}>
      {steps.map((step, index) => getStep(index, formObj))}
    </Stepper>
  ));
