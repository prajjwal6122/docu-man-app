import React, { useState, useRef, useEffect } from 'react';
import './TagInput.css';

/**
 * Tag Input Component
 * Allows users to add/remove tags with autocomplete
 */
const TagInput = ({
  label,
  tags = [],
  onChange,
  suggestions = [],
  error,
  required = false,
  disabled = false,
  placeholder = 'Type and press Enter to add tags',
  maxTags = 10,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions
        .filter((s) => {
          // Handle both string suggestions and object suggestions with tag_name
          const suggestionText = typeof s === "string" ? s : s?.tag_name || "";
          return (
            suggestionText.toLowerCase().includes(inputValue.toLowerCase()) &&
            !tags.includes(suggestionText)
          );
        })
        .map((s) => (typeof s === "string" ? s : s?.tag_name || ""));
      
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, suggestions, tags]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      onChange([...tags, trimmedTag]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (indexToRemove) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    addTag(suggestion);
  };

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <div className={`tag-input-container ${error ? 'is-invalid' : ''}`}>
        <div className="tag-list">
          {tags.map((tag, index) => (
            <span key={index} className="tag-item">
              {tag}
              <button
                type="button"
                className="tag-remove"
                onClick={() => removeTag(index)}
                disabled={disabled}
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            className="tag-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ''}
            disabled={disabled || tags.length >= maxTags}
          />
        </div>
        
        {showSuggestions && (
          <div ref={suggestionsRef} className="tag-suggestions">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="tag-suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
      {tags.length >= maxTags && (
        <div className="form-text text-warning">
          Maximum {maxTags} tags allowed
        </div>
      )}
    </div>
  );
};

export default TagInput;
