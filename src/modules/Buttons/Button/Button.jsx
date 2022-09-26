import s from '../Button/button.module.css';

const getStyledButton = theme => {
  switch (theme) {
    case 'orangeTheme':
      return {
        background: '#FF751D',
        color: 'white',
        border: 'none',
      };
    case 'whiteTheme':
      return {
        background: '#FFFFFF',
        color: '#52555F',
        border: '2px solid #F6F7FC',
      };

    default:
      return {};
  }
};

export const Button = ({ text, theme, onClick, type, disabled }) => {
  const style = getStyledButton(theme);

  return (
    <button
      className={(type === 'exit' && s.exit) || (type === 'submit' && s.submit)}
      style={style}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
