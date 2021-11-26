import { Children, useState, useEffect, forwardRef, cloneElement } from 'react';
import clsx from 'clsx';
import { Card, Button } from 'react-bootstrap';

import '../assets/sass/main.scss';

const Stepper = forwardRef(function Stepper(props, ref){
  const {
    activeStep = 0,
    children,
    className,
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
    <Card className={classes}>
      <Card.Header>
      <div className="stepper-header">
        {`${stepHeader} | ${curIndex + 1}/${childrenArray.length}`}
      </div>
      </Card.Header>
      <Card.Body ref={ref} {...restProps} className="container-md py-0">
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