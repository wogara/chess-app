// BackButton.js
import React, {useEffect} from 'react';

function BackButton({undoMove}) {
    return (
        <button onClick={undoMove}>Back</button>
    );
}

export default BackButton;
