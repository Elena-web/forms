import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { validationSchema } from '../../util/validationSchema';
import { addDataForm } from '../../store/formDataSlice';
import { RootState } from '../../store/store';
import { fileToBase64 } from '../../util/fileToBase64';
import { MyForm } from '../../util/types';
import styles from '../../styles/Form.module.css';

type FormErrorMap = Record<string, string>;

interface ReactHookFormProps {
  onClose: () => void;
}

export default function UncontrolledForm({ onClose }: ReactHookFormProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageRef = useRef<HTMLInputElement>(null);
  const countries = useSelector((state: RootState) => state.countries);
  const [errors, setErrors] = useState<FormErrorMap>({});

  const handleSubmit: React.FormEventHandler<MyForm> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      const validatedData = validationSchema.validateSync(
        {
          name: form.elements.name.value,
          age: Number(form.elements.age.value),
          email: form.elements.email.value,
          password: form.elements.password.value.trim(),
          passwordConfirm: form.elements.passwordConfirm.value.trim(),
          gender: form.elements.gender.value,
          isAccept: !!form.elements.isAccept.checked,
          country: form.elements.country.value,
          image: imageRef.current?.files,
        },
        { abortEarly: false }
      );

      if (!imageRef.current?.files) return;
      const file = imageRef.current.files[0];
      const base64Image = await fileToBase64(file);

      dispatch(
        addDataForm({
          ...validatedData,
          isAccept: !!validatedData.isAccept,
          image: base64Image,
        })
      );
      onClose();

      navigate('/', { replace: true });
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const newErrors: FormErrorMap = {};
        err.inner.forEach((e) => {
          if (e.path && !newErrors[e.path]) {
            newErrors[e.path] = e.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <section>
      <h2>Classic Uncontrolled Form</h2>
      <form
        onSubmit={handleSubmit}
        aria-label="classic-form"
        noValidate
        data-testid="uncontrolled-form"
        className={styles.form}
      >
        <div className={styles.form__group}>
          <label className={styles.form__box}>
            Name
            <input name="name" type="text" required />
            <span className={styles.error}>{errors.name}</span>
          </label>
        </div>

        <div className={styles.form__group}>
          <label className={styles.form__box}>
            Age
            <input name="age" type="number" required />
            <span className={styles.error}>{errors.age}</span>
          </label>
        </div>

        <div className={styles.form__group}>
          <label className={styles.form__box}>
            Email
            <input name="email" type="email" required />
            <span className={styles.error}>{errors.email}</span>
          </label>
        </div>

        <div className={styles.form__group}>
          <label className={styles.form__box}>
            Password
            <input name="password" type="password" required />
            <span className={styles.error}>{errors.password}</span>
          </label>
        </div>

        <div className={styles.form__group}>
          <label className={styles.form__box}>
            Confirm Password
            <input name="passwordConfirm" type="password" required />
            <span className={styles.error}>{errors.passwordConfirm}</span>
          </label>
        </div>

        <div className={styles.form__group}>
          <label className={styles.form__box}>
            Upload Image
            <input
              ref={imageRef}
              name="image"
              type="file"
              accept=".png, .jpg, .jpeg"
            />
            <span className={styles.error}>{errors.image}</span>
          </label>
        </div>

        <div className={styles.form__group}>
          <label className={styles.form__box}>
            Country
            <select name="country">
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className={styles.error}>{errors.country}</span>
          </label>
        </div>

        <fieldset className={styles.gender}>
          <legend>Gender</legend>
          <label className={styles.form__box}>
            <input
              type="radio"
              name="gender"
              value="male"
              required
              aria-label="Male"
            />{' '}
            Male
          </label>
          <label className={styles.form__box}>
            <input
              type="radio"
              name="gender"
              value="female"
              aria-label="Female"
            />{' '}
            Female
          </label>
          <span className={styles.error}>{errors.gender}</span>
        </fieldset>

        <div className={styles.form__group}>
          <label className={styles.form__box}>
            <input type="checkbox" name="isAccept" required /> Accept Terms &
            Conditions
          </label>
          <span className={styles.error}>{errors.isAccept}</span>
        </div>

        <button type="submit" className={styles.submit}>
          Submit Form
        </button>
      </form>
    </section>
  );
}
