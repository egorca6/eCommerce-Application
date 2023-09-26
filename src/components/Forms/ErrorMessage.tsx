import { Message } from 'primereact/message';
import { FC } from 'react';

interface ErrorMessageProp {
  err: string | undefined;
}

export const ErrorMessage: FC<ErrorMessageProp> = ({ err }): JSX.Element => {
  return (
    <Message
      className={(err && 'h-2rem mb-1 w-full border-round-md') || 'hidden'}
      severity={'error'}
      text={err}
    />
  );
};
