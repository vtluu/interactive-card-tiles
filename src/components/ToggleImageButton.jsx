import './ToggleImageButton.css';

function ToggleImageButton({ onToggle, showImages }) {
  return (
    <button 
      className="toggle-image-button" 
      onClick={onToggle}
      title={showImages ? "Show card suits" : "Show themed images"}
    >
      {showImages ? '🃏' : '🖼️'}
    </button>
  );
}

export default ToggleImageButton;
