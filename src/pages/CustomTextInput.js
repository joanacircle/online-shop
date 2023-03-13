import React, { useRef } from 'react';

export function CustomTextInput() {
  const textInputRef = useRef(null);

  function focusTextInput() {
    textInputRef.current.focus();
  }
  console.log(textInputRef)

  return (
    <div>
      <input type="text" ref={textInputRef} />
      <br /><br />
      <input
        type="button"
        value="點我 focus 輸入欄位"
        onClick={focusTextInput}
      />
    </div>
  );
}

