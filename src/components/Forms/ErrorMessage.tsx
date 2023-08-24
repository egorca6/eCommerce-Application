import { Message } from 'primereact/message';
import { errorMessage } from '../../types/types';

export const ErrorMessage = (props: errorMessage): JSX.Element => {
  const err = props.err;
  return (
    <Message
      className={(err && 'h-2rem mb-1 w-full border-round-md') || 'hidden'}
      severity={'error'}
      text={err}
    />
  );
};
