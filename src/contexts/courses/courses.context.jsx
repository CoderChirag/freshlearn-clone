import { createContext, useEffect, useMemo, useReducer } from 'react';

import { COURSES_ACTION_TYPES } from './courses.types';
import { onAuthStateChange } from '../../util/firebase/auth/firebase-auth.util';

export const CoursesContext = createContext({
	courses: [],
});

const coursesReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case COURSES_ACTION_TYPES.CREATE_NEW_COURSE:
			return {
				...state,
				courses: [...state.courses, payload],
			};
		case COURSES_ACTION_TYPES.CLEAR_COURSES:
			return {
				...state,
				courses: payload,
			};
		default:
			throw new Error(`Unhandled action type: ${type} in coursesReducer`);
	}
};

const INITIAL_STATE = {
	courses: [],
};

export const CoursesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(coursesReducer, INITIAL_STATE);

	const clearCourses = useMemo(
		() => () =>
			dispatch({
				type: COURSES_ACTION_TYPES.CLEAR_COURSES,
				payload: [],
			}),
		[dispatch]
	);

	const createNewCourse = useMemo(
		() => course => {
			dispatch({
				type: COURSES_ACTION_TYPES.CREATE_NEW_COURSE,
				payload: course,
			});
		},
		[dispatch]
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChange(user => {
			if (!user) {
				clearCourses();
			}
		});

		return unsubscribe;
	}, [clearCourses]);

	return (
		<CoursesContext.Provider
			value={{ ...state, clearCourses, createNewCourse }}
		>
			{children}
		</CoursesContext.Provider>
	);
};
