// BackButton.js
import React, {useEffect} from 'react';

function BackButton({undoMove}) {
    return (
        <button type='button' className="btn btn-secondary flex-fill" onClick={undoMove}>Back</button>
    );
}

export default BackButton;
