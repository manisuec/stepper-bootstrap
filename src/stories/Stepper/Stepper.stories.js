import { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import Stepper from '../../Stepper/Stepper';
import Step from '../../Stepper/Step';

import { StepperContext } from '../../Stepper/StepperContext';

import './story.css'

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

const getStep = (index, step) => {
  const headerLabel = `${step.name}`;

  return (
    <Step
      key={index}
      stepHeader={headerLabel}
    >
      <div>{`Step ${index + 1} body`}</div>
    </Step>
  )
};

const CustomHeader = () => {
  const { activeStepIndex } = useContext(StepperContext);

  return (<div className="text-uppercase text-white px-3 py-2 bg-primary">{`Custom Header ${activeStepIndex + 1}`}</div>);
}

const getStepWithCustomHeader = (index) => {

  return (
    <Step
      key={index}
      stepHeader={<CustomHeader />}
    >
      <div>{`Step ${index + 1} body`}</div>
    </Step>
  );
};

let activeStep = 0;

storiesOf('Stepper', Stepper)
  .add('with activeStep = 0', () => (
    <Stepper activeStep={activeStep} className="container-md">
      {steps.map((step, index) => getStep(index, step))}
    </Stepper>
  ))
  .add('with activeStep = 1', () => (
    <Stepper activeStep={activeStep + 1} className="container-md">
      {steps.map((step, index) => getStep(index, step))}
    </Stepper>
  ))
  .add('with activeStep = 2', () => (
    <Stepper activeStep={activeStep + 2} className="container-md">
      {steps.map((step, index) => getStep(index, step))}
    </Stepper>
  )).add('with custom header', () => (
    <Stepper activeStep={activeStep} className="container-md">
      {steps.map((step, index) => getStepWithCustomHeader(index, step))}
    </Stepper>
  )).add('with custom class', () => (
    <Stepper activeStep={activeStep} className="bg-light mw-200 mh-100 container-lg">
      {steps.map((step, index) => getStep(index, step))}
    </Stepper>
  ));
