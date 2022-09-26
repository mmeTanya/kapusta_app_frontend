import { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { nanoid } from '@reduxjs/toolkit';
import { addField } from 'redux/table/tableSlice';

const InputArea = () => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sum, setSum] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const newField = {
      id: nanoid(),
      date: moment().format('DD.MM.YYYY'),
      description,
      category,
      sum,
    };

    dispatch(addField(newField));
    setDescription('');
    setCategory('');
    setSum('');
  };

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'description':
        setDescription(value);
        break;
      case 'category':
        setCategory(value);
        break;

      case 'sum':
        setSum(value);
        break;

      default:
        break;
    }
  };

  const clearInput = () => {
    setDescription('');
    setCategory('');
    setSum('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            name="description"
            value={description}
            onChange={handleChange}
            type="text"
            placeholder="Product description"
          />
        </label>
        <label>
          <select name="category" value={category} onChange={handleChange}>
            <option value="" disabled>
              Product category
            </option>
            <option value="Transport">Transport</option>
            <option value="Products">Health</option>
            <option value="Alcohol">Alcohol</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Housing">Housing</option>
            <option value="Technique">Technique</option>
            <option value="Communical, communication">
              Communical, communication
            </option>
            <option value="Sport, Hobbies">Sport, Hobbies</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          <input
            name="sum"
            value={sum}
            onChange={handleChange}
            type="text"
            placeholder="0.00"
          />
        </label>
        <button type="submit">INPUT</button>
        <button type="button" onClick={clearInput}>
          CLEAR
        </button>
      </form>
    </>
  );
};
export default InputArea;
