import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { useSignInForm } from '../../hooks/useSignInForm';
import { ErrorMessage } from './ErrorMessage';
import styles from './SignInForm.module.scss';

export const SignInForm = (): JSX.Element => {
  const { form, onSubmit, checked, setChecked } = useSignInForm();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column">
      <InputText
        className="mb-1 border-round-lg"
        {...form.register('email')}
        type="text"
        placeholder="Enter your email"
      />
      <ErrorMessage err={form.formState.errors.email?.message} />

      <div className="p-inputgroup">
        <InputText
          className={(styles.input, 'mt-5 mb-1')}
          {...form.register('password')}
          type={!checked ? 'password' : 'text'}
          placeholder="Enter your password"
          autoComplete="off"
        />
        <span className={(styles.span, 'p-inputgroup-addon mt-5 mb-1')}>
          <Checkbox
            checked={checked}
            onChange={(): void => setChecked(!checked)}
          />
        </span>
      </div>
      <ErrorMessage err={form.formState.errors.password?.message} />

      <Button
        className="mt-6 mb-5 border-round-lg"
        label="Sign In"
        type="submit"
      />
    </form>
  );
};
