import React from 'react';

export default ({input, label, size = 's12', type = 'text', meta: {error, touched}}) => (
    <div className={`col input-field ${size}`}>
        <input {...input} type={type} id={input.name}/>
        <label htmlFor={input.name}>{label}</label>
        <p className="red-text text-darken-2">{touched && error}</p>
    </div>
);
