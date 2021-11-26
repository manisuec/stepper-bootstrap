import { Children, useState, useEffect, forwardRef, cloneElement, isValidElement } from 'react';
import clsx from 'clsx';
import { Card, Button } from 'react-bootstrap';

import '../assets/sass/main.scss';

const StepperHeader = ({stepHeader, curIndex, totalSteps}) => {
  return isValidElement(stepHeader) ? stepHeader :
  (<div>
    {`${stepHeader} | ${curIndex + 1}/${totalSteps}`}
  </div>)
}

const Stepper = forwardRef(function Stepper(props, ref){
  const {
    activeStep = 0,
    children,
    onHide,
    className: stepperClassName,
    ...restProps
  } = props;

  const stepperClasses = clsx(stepperClassName, 'p-0 mw-400');
  let [curIndex, setCurIndex] = useState(activeStep);
  const childrenArray = Children.toArray(children).filter(Boolean);

  const steps = childrenArray.map((step, index) => {
    return cloneElement(step, {
      index,
      last: index + 1 === childrenArray.length,
      ...step.props,
    });
  });
  const {
    stepHeader,
    bodyComponent,
    className: stepClassName,
  } = steps[curIndex].props;

  const stepClasses = clsx(stepClassName, 'py-2 mh-100');

  useEffect(() => {
    setCurIndex(activeStep);
  }, [activeStep]);

  const previousHandler = index => e => {
    e.preventDefault();
    if (index > 0) {
      setCurIndex(--curIndex);
    }
  };

  const nextHandler = index => e => {
    e.preventDefault();
    if (index !== childrenArray.length - 1) {
      setCurIndex(++curIndex);
    }
  };

  return (
    <Card className={stepperClasses}>
      <Card.Header>
        {<StepperHeader stepHeader={stepHeader} curIndex={curIndex} totalSteps={childrenArray.length} />}
      </Card.Header>
      <Card.Body ref={ref} {...restProps} className={stepClasses}>
        {bodyComponent}
      </Card.Body>
      <Card.Footer className="text-right">
        <div className="d-flex justify-content-between">
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={previousHandler(curIndex)} 
            disabled={curIndex === 0}>
              {'Previous'}
          </Button>
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={nextHandler(curIndex)} 
            disabled={curIndex === childrenArray.length - 1}>
              {'Next'}
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
});

export default Stepper;