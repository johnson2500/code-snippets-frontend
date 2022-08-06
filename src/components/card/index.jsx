/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function FCard({
  className,
  onClick,
  body,
  title,
  buttonLabel,
  header,
  footer,
}) {
  return (
    <Card className={className}>
      {header && (<Card.Header>{header}</Card.Header>)}
      <Card.Body>
        {title && (<Card.Title>{title}</Card.Title>)}
        {body && (<Card.Text>{body}</Card.Text>)}
        {buttonLabel && (
        <Button
          onClick={onClick}
          variant="primary"
        >
          {buttonLabel}
        </Button>
        )}
      </Card.Body>
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card>
  );
}

export default FCard;
