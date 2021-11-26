import { storiesOf } from '@storybook/react';
import Stepper from '../../Stepper/Stepper';

const steps = [
  {
    name: 'First Header',
  },
  {
    name: 'Second Header',
  },
  {
    name: 'Third Header',
  },
];

const getStep = (index, step, stepObj) => {
  const headerLabel = `${step.name}`;

  switch (index) {
    case 0:
      return (
        <div
          key={index}
          stepHeader={headerLabel}
          bodyComponent={stepObj}
        />
      );
    case 1:
      return (
        <div
          key={index}
          stepHeader={headerLabel}
          bodyComponent={stepObj}
        />
      );
    case 2:
      return (
        <div
          key={index}
          stepHeader={headerLabel}
          bodyComponent={stepObj}
        />
      );
    default:
      return null;
  }
};

const getStepWithCustomHeader = (index, step, stepObj) => {
  const header = <div className="text-uppercase text-primary">{`Custom Header ${index + 1}`}</div>;

  switch (index) {
    case 0:
      return (
        <div
          key={index}
          stepHeader={header}
          bodyComponent={stepObj}
        />
      );
    case 1:
      return (
        <div
          key={index}
          stepHeader={header}
          bodyComponent={stepObj}
        />
      );
    case 2:
      return (
        <div
          key={index}
          stepHeader={header}
          bodyComponent={stepObj}
        />
      );
    default:
      return null;
  }
};

let activeStep = 0;
const stepObj = (stepNo) => <div>{`Step ${stepNo} body`}</div>;

storiesOf('Stepper', Stepper)
  .add('with activeStep = 0', () => (
    <Stepper activeStep={activeStep}>
      {steps.map((step, index) => getStep(index, step, stepObj(index + 1)))}
    </Stepper>
  ))
  .add('with activeStep = 1', () => (
    <Stepper activeStep={activeStep + 1}>
      {steps.map((step, index) => getStep(index, step, stepObj(index + 1)))}
    </Stepper>
  ))
  .add('with activeStep = 2', () => (
    <Stepper activeStep={activeStep + 2}>
      {steps.map((step, index) => getStep(index, step, stepObj(index + 1)))}
    </Stepper>
  )).add('with custom header', () => (
    <Stepper activeStep={activeStep}>
      {steps.map((step, index) => getStepWithCustomHeader(index, step, stepObj(index + 1)))}
    </Stepper>
  ));
