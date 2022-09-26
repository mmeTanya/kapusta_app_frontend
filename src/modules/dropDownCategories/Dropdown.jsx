import React, { useEffect, useState } from 'react';
import styles from './Dropdown.module.css';
import { ReactComponent as Arrowdown } from '../../images/icons/arrow-bottom.svg';
import { useDispatch, useSelector } from 'react-redux';
import categoriesOperations from 'redux/categories/categoriesOperations';
import { getCategoriesList } from '../../redux/categories/categoriesSelectors';
import { useDetectClickOutside } from 'react-detect-click-outside';

export default function Dropdown({ type, onCategorySet, categoryName }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const categoriesList = useSelector(getCategoriesList);

  useEffect(() => {
    dispatch(categoriesOperations.getCategoriesList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeDropdown = () => setIsOpen(false);

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });

  const toggling = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const onOptionClicked = value => () => {
    onCategorySet(value);
    setIsOpen(false);
  };

  return (
    <div ref={ref}>
      <div className={styles.dropdown}>
        <button onClick={toggling} type="button" className={styles.dropbtn}>
          {categoryName || 'Product category'}
          <Arrowdown />
        </button>
        {isOpen && (
          <ul className={styles.dropdownContent}>
            {categoriesList &&
              categoriesList
                .filter(category => category.type === type)
                .map(category => (
                  <li
                    key={category._id}
                    onClick={onOptionClicked(category)}
                    className={styles.dropdownItem}
                  >
                    {category.name}
                  </li>
                ))}
          </ul>
        )}
      </div>
    </div>
  );
}
