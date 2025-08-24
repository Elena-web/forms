import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect } from 'react';
import { markDataOld } from '../store/formDataSlice';
import styles from '../styles/Form.module.css';

export function MainDataList() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.formData.data);

  useEffect(() => {
    data.forEach((item, index) => {
      if (item.isNew) {
        setTimeout(() => dispatch(markDataOld(index)), 4000);
      }
    });
  }, [data, dispatch]);

  return (
    <div className={styles.dataList}>
      {data.map((item, index) => (
        <div
          key={index}
          className={`${styles.dataItem} ${item.isNew ? styles.new : ''}`}
        >
          <p>Name: {item.name}</p>
          <p>Age: {item.age}</p>
          <p>Email: {item.email}</p>
          <p>Country: {item.country}</p>
          <p>Gender: {item.gender}</p>
          <p>Accepted Terms: {item.isAccept ? 'Yes' : 'No'}</p>
          {item.image && (
            <div>
              <p>Uploaded Image:</p>
              <img
                src={item.image}
                alt={`${item.name}'s upload`}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
