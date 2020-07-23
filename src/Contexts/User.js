import React from 'react';
const User = React.createContext({
    avatar: null,
    credit_card: null,
    email: null,
    first_name: null,
    is_checked: false,
    passport: null,
    password: null,
    phone: null,
    role: 'guest',
    token: null,
    second_name: null,
    _id: null
});
export default User;