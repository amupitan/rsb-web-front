import React from 'react';
import defaultImg from '../../assets/default.jpg';

export default ({ avatar, alt = 'avatar', className = '', type }) => <img src={renderableProfilePicture(avatar, { type: type }) || defaultImg} alt={alt} className={className} />

const renderableProfilePicture = (pic, { type = 'image/png' } = {}) => {
    if (typeof pic === 'string' && pic !== '') {
        return `data:${type};base64, ${pic}`;
    }
    return pic;
};