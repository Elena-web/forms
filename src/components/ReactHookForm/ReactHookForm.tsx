import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { addDataForm } from '../../store/formDataSlice';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../../util/validationSchema';
import { FormData2 } from '../../util/types';
import { RootState } from '../../store/store';
import { fileToBase64 } from '../../util/fileToBase64';
import styles from '../../styles/Form.module.css';

interface ReactHookFormProps {
  onClose: () => void;
}

export default function ReactHookForm({ onClose }: ReactHookFormProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      gender: 'male',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData2) => {
    const base64Picture = await fileToBase64(data.image[0]);
    dispatch(addDataForm({ ...data, image: base64Picture }));
    reset();
    onClose();
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>React Hook Form</h1>
      <form
        className={styles.form}
        data-testid="react-hook-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="name" className={styles.form__box}>
          First Name
          <input id="name" {...register('name')} />
          <p className={styles.error}>{errors.name?.message}</p>
        </label>
        <label htmlFor="age" className={styles.form__box}>
          Age
          <input id="age" {...register('age')} />
          <p className={styles.error}>{errors.age?.message?.split(',')[0]}</p>
        </label>
        <label htmlFor="email" className={styles.form__box}>
          Email
          <input id="email" {...register('email')} />
          <p className={styles.error}>{errors.email?.message}</p>
        </label>
        <label htmlFor="password" className={styles.form__box}>
          Password
          <input id="password" {...register('password')} type="text" />
          <p className={styles.error}>{errors.password?.message}</p>
        </label>
        <label htmlFor="passwordConfirm" className={styles.form__box}>
          Confirm Password
          <input
            id="passwordConfirm"
            {...register('passwordConfirm')}
            type="text"
          />
          <p className={styles.error}>{errors.passwordConfirm?.message}</p>
        </label>

        <label htmlFor="image" className={styles.form__box}>
          Upload image
          <input
            id="image"
            {...register('image')}
            type="file"
            accept=".png, jpeg, jpg"
          />
          <p className={styles.error}>{errors.image?.message}</p>
        </label>
        <label htmlFor="country" className={styles.form__box}>
          Choose country
          <select id="country" {...register('country')}>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.gender}>
          <label htmlFor="male">
            <input
              id="male"
              {...register('gender')}
              type="radio"
              value="male"
            />
            Male
          </label>
          <label htmlFor="female">
            <input
              id="female"
              {...register('gender')}
              type="radio"
              value="female"
            />
            Female
          </label>
        </div>
        <p className={styles.error}>{errors.gender?.message}</p>
        <div className={styles.form__group}>
          <label htmlFor="isAccept" className={styles.form__box}>
            Accept Terms & Conditions
            <input id="isAccept" {...register('isAccept')} type="checkbox" />
            <p className={styles.error}>{errors.isAccept?.message}</p>
          </label>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={`${styles.submit} ${!isValid ? styles.disabled : ''}`}
        >
          Submit form
        </button>
      </form>
    </div>
  );
}
