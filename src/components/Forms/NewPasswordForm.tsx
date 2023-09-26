import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ErrorMessage } from './ErrorMessage';
import { Checkbox } from 'primereact/checkbox';
import { useNewPasswordForm } from '../../hooks/useNewPasswordForm';
import { ErrMessage } from '../../types/types';
import styles from './NewPasswordForm.module.scss';

export const NewPasswordForm = (props: ErrMessage): JSX.Element => {
  const {
    form,
    checkedOldPassword,
    setCheckedOldPassword,
    checkedNewPassword,
    setCheckedNewPassword,
    onSubmit,
  } = useNewPasswordForm(props);

  return (
    <div className={styles.registration_data_name}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column">
        <div className="p-inputgroup mb-1">
          <InputText
            className={styles.input}
            {...form.register('passwordOld')}
            type={!checkedOldPassword ? 'password' : 'text'}
            placeholder="Enter your Old password"
            autoComplete="on"
          />
          <span className={(styles.span, 'p-inputgroup-addon')}>
            <Checkbox
              checked={checkedOldPassword}
              onChange={(): void => setCheckedOldPassword(!checkedOldPassword)}
            />
          </span>
        </div>

        <ErrorMessage err={form.formState.errors.passwordOld?.message} />

        <div className="p-inputgroup mb-1">
          <InputText
            className={styles.input}
            {...form.register('passwordNew')}
            type={!checkedNewPassword ? 'password' : 'text'}
            placeholder="Enter your New password"
            autoComplete="on"
          />
          <span className={(styles.span, 'p-inputgroup-addon')}>
            <Checkbox
              checked={checkedNewPassword}
              onChange={(): void => setCheckedNewPassword(!checkedNewPassword)}
            />
          </span>
        </div>

        <ErrorMessage err={form.formState.errors.passwordNew?.message} />

        <Button
          className="mt-3 mb-1 border-round-lg"
          label="Save"
          type="submit"
          onClick={(): void => {}}
        />
      </form>
    </div>
  );
};
