import { createContext, useEffect, useMemo, useReducer } from 'react';

import { USER_ACTION_TYPES } from './user.types';
import { onAuthStateChange } from '../../util/firebase/auth/firebase-auth.util';

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => {},
});

const userReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			throw new Error(`Unhandled action type: ${type} in userReducer`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

	const setCurrentUser = useMemo(
		() => user => {
			console.log('Auth state changed');
			console.log(user);
			if (user) {
				window.localStorage.setItem('user', JSON.stringify(user));
			} else {
				window.localStorage.removeItem('user');
			}
			dispatch({
				type: USER_ACTION_TYPES.SET_CURRENT_USER,
				payload: user,
			});
		},
		[dispatch]
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChange(user => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, [setCurrentUser]);

	return (
		<UserContext.Provider value={{ ...state, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
};
