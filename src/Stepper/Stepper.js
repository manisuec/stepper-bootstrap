import {
  Children,
  useState,
  forwardRef,
  cloneElement,
  isValidElement,
  useEffect,
} from 'react';
import clsx from 'clsx';
import { Card, Button } from 'react-bootstrap';

import { StepperContext } from './StepperContext';
import useStepIndex from './useStepIndex';

import '../assets/sass/main.scss';

const StepFooter = ({
  stepFooter,
  curIndex,
  totalSteps,
  nextHandler,
  previousHandler,
}) => {
  if (isValidElement(stepFooter)) {
    return stepFooter;
  } else {
    return (
      <div className="d-flex justify-content-between">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={previousHandler(curIndex)}
          disabled={curIndex === 0}
        >
          {'Previous'}
        </Button>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={nextHandler(curIndex)}
          disabled={curIndex === totalSteps - 1}
        >
          {'Next'}
        </Button>
      </div>
    );
  }
};

const StepperHeader = ({ stepHeader, curIndex, totalSteps }) => {
  if (isValidElement(stepHeader)) {
    return stepHeader;
  } else {
    return (
      <Card.Header>
        <div className="d-flex flex-row-reverse justify-content-between">
          <div>{`${curIndex + 1}/${totalSteps}`}</div>
          {stepHeader ? <div>{stepHeader}</div> : null}
        </div>
      </Card.Header>
    );
  }
};

const Stepper = forwardRef(function Stepper(props, ref) {
  const {
    activeStep = 0,
    children,
    className: stepperClassName,
    ...restProps
  } = props;

  const stepperClasses = clsx(stepperClassName, 'stepper-container');
  let [curIndex, setCurIndex] = useState(activeStep);
  const childrenArray = Children.toArray(children).filter(Boolean);
  const { activeStepIndex, setActiveStepIndex } = useStepIndex();

  useEffect(() => {
    if (activeStepIndex > 0 && curIndex !== activeStepIndex) {
      setCurIndex(activeStepIndex);
    } else if (
      activeStepIndex === 0 &&
      activeStep === 0 &&
      curIndex > activeStepIndex
    ) {
      setCurIndex(activeStepIndex);
    }
  }, [activeStepIndex, curIndex]);

  const steps = childrenArray.map((step, index) => {
    return cloneElement(step, {
      index,
      last: index + 1 === childrenArray.length,
      ...step.props,
    });
  });
  const {
    stepHeader,
    stepFooter,
    children: stepChildren,
    className: stepClassName,
  } = steps[curIndex].props;

  const stepClasses = clsx(stepClassName, 'py-2 mh-100');

  const previousHandler = index => e => {
    e.preventDefault();
    if (index > 0) {
      const tempCurIndex = curIndex - 1;

      setCurIndex(tempCurIndex);
      setActiveStepIndex(tempCurIndex);
    }
  };

  const nextHandler = index => e => {
    e.preventDefault();
    if (index !== childrenArray.length - 1) {
      const tempCurIndex = curIndex + 1;

      setCurIndex(tempCurIndex);
      setActiveStepIndex(tempCurIndex);
    }
  };

  return (
    <StepperContext.Provider value={{ activeStepIndex, setActiveStepIndex }}>
      <Card className={stepperClasses}>
        {
          <StepperHeader
            stepHeader={stepHeader}
            curIndex={curIndex}
            totalSteps={childrenArray.length}
          />
        }
        <Card.Body ref={ref} {...restProps} className={stepClasses}>
          {stepChildren}
        </Card.Body>
        <Card.Footer className="text-right">
          {
            <StepFooter
              stepFooter={stepFooter}
              curIndex={curIndex}
              nextHandler={nextHandler}
              previousHandler={previousHandler}
              totalSteps={childrenArray.length}
            />
          }
        </Card.Footer>
      </Card>
    </StepperContext.Provider>
  );
});

export default Stepper;
