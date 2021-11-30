import { forwardRef } from 'react';
import { Card } from 'react-bootstrap';

const Step = forwardRef(function Step(props, ref) {
  const { children, className, ...restProps } = props;

  return (
    <Card.Body ref={ref} {...restProps} className={className}>
      {children}
    </Card.Body>
  );
});

export default Step;
