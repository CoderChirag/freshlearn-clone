import { createContext, useEffect, useMemo, useReducer } from 'react';

import { COURSES_ACTION_TYPES } from './courses.types';
import { onAuthStateChange } from '../../util/firebase/auth/firebase-auth.util';

export const CoursesContext = createContext({
	courses: [],
});

const coursesReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case COURSES_ACTION_TYPES.SET_ALL_COURSES_DATA:
			return {
				...state,
				courses: payload,
			};
		case COURSES_ACTION_TYPES.CREATE_NEW_COURSE:
			return {
				...state,
				courses: [...state.courses, payload],
			};
		case COURSES_ACTION_TYPES.CLEAR_COURSES:
			return {
				...state,
				courses: [],
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

	const setAllCoursesData = useMemo(
		() => courses => {
			dispatch({
				type: COURSES_ACTION_TYPES.SET_ALL_COURSES_DATA,
				payload: courses,
			});
			window.localStorage.setItem('courses', JSON.stringify(courses));
		},
		[dispatch]
	);

	const createNewCourse = useMemo(
		() => course => {
			dispatch({
				type: COURSES_ACTION_TYPES.CREATE_NEW_COURSE,
				payload: course,
			});
			if (window.localStorage.getItem('courses')) {
				let courses = JSON.parse(
					window.localStorage.getItem('courses')
				);
				courses.push(course);
				window.localStorage.setItem('courses', JSON.stringify(courses));
			} else {
				window.localStorage.setItem(
					'courses',
					JSON.stringify([course])
				);
			}
		},
		[dispatch]
	);

	const clearCourses = useMemo(
		() => () => {
			dispatch({
				type: COURSES_ACTION_TYPES.CLEAR_COURSES,
				payload: [],
			});
			window.localStorage.removeItem('courses');
		},
		[dispatch]
	);

	const setCoursesDataFromStorage = useMemo(
		() => () => {
			if (
				state.courses.length === 0 &&
				window.localStorage.getItem('courses')
			) {
				setAllCoursesData(
					JSON.parse(window.localStorage.getItem('courses'))
				);
			}
		},
		[state.courses.length, setAllCoursesData]
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChange(user => {
			if (!user) {
				clearCourses();
			} else if (window.localStorage.getItem('courses')) {
				setAllCoursesData(
					JSON.parse(window.localStorage.getItem('courses'))
				);
			}
		});

		return unsubscribe;
	}, [clearCourses, setAllCoursesData]);

	return (
		<CoursesContext.Provider
			value={{
				...state,
				setAllCoursesData,
				createNewCourse,
				clearCourses,
				setCoursesDataFromStorage,
			}}
		>
			{children}
		</CoursesContext.Provider>
	);
};
