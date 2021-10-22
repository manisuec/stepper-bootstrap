import { Children, useState, useEffect, forwardRef, cloneElement } from 'react';
import clsx from 'clsx';
import { Card } from 'react-bootstrap';

const Stepper = forwardRef(function Stepper(props, ref){
  const {
    activeStep = 0,
    children,
    stepperLabel,
    className,
    setPrevStep,
    onHide,
    ...restProps
  } = props;

  const classes = clsx(className);
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
  } = steps[curIndex].props;

  useEffect(() => {
    setCurIndex(activeStep);
  }, [activeStep]);

  const previousHandler = index => e => {
    e.preventDefault();
    if (index > 0) {
      if (setPrevStep) {
        setPrevStep(--curIndex);
      } else {
        setCurIndex(--curIndex);
      }
    }
  };

  const nextHandler = index => e => {
    e.preventDefault();
    if (index !== childrenArray.length - 1) {
      setCurIndex(++curIndex);
    }
  };

  return (
    <Card className={classes}>
      <Card.Header>
      <div className="stepper-header">
        {
          curIndex > 0 ? (
            <span onClick={previousHandler(curIndex)}>
              <i class="bi bi-arrow-left"></i>
            </span>
          ) : ('')
        }
        {`${stepperLabel} | ${stepHeader} | ${curIndex + 1}/${childrenArray.length}`}
      </div>
      </Card.Header>
      <Card.Body ref={ref} {...restProps} className="py-0">
        {bodyComponent}
      </Card.Body>
      <Card.Footer className="text-right">
        {
          curIndex !== childrenArray.length - 1 ? (
            <span className="d-flex align-items-center" onClick={nextHandler(curIndex)}>
              <i class="bi bi-arrow-right"></i>
            </span>
          ) : ('')
        }
      </Card.Footer>
    </Card>
  );
});

export default Stepper;