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
		case COURSES_ACTION_TYPES.ADD_NEW_MODULE:
			return {
				...state,
				courses: state.courses.map(course => {
					if (course.id === payload.courseId) {
						return {
							...course,
							modules: [...course.modules, payload.module],
						};
					}
					return course;
				}),
			};
		case COURSES_ACTION_TYPES.ADD_NEW_CHAPTER:
			return {
				...state,
				courses: state.courses.map(course => {
					if (course.id === payload.courseId) {
						return {
							...course,
							modules: course.modules.map(module => {
								if (module.id === payload.moduleId) {
									return {
										...module,
										chapters: [
											...module.chapters,
											payload.chapter,
										],
									};
								}
								return module;
							}),
						};
					}
					return course;
				}),
			};
		case COURSES_ACTION_TYPES.EDIT_COURSE:
			return {
				...state,
				courses: state.courses.map(course => {
					if (course.id === payload.courseId) {
						return {
							...course,
							title: payload.courseData.title,
							description: payload.courseData.description,
							visibility: payload.courseData.visibility,
						};
					}
					return course;
				}),
			};
		case COURSES_ACTION_TYPES.EDIT_CHAPTER:
			return {
				...state,
				courses: state.courses.map(course => {
					if (course.id === payload.courseId) {
						return {
							...course,
							modules: course.modules.map(module => {
								if (module.id === payload.moduleId) {
									return {
										...module,
										chapters: module.chapters.map(
											chapter => {
												if (
													chapter.id ===
													payload.chapterId
												) {
													return {
														...chapter,
														...payload.chapter,
													};
												}
												return chapter;
											}
										),
									};
								}
								return module;
							}),
						};
					}
					return course;
				}),
			};
		case COURSES_ACTION_TYPES.DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter(
					course => course.id !== payload.courseId
				),
			};
		case COURSES_ACTION_TYPES.CLONE_COURSE:
			return {
				...state,
				courses: [...state.courses, payload],
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

	const addNewModule = useMemo(
		() => (courseId, module) => {
			dispatch({
				type: COURSES_ACTION_TYPES.ADD_NEW_MODULE,
				payload: {
					courseId,
					module,
				},
			});
		},
		[dispatch]
	);

	const addNewChapter = useMemo(
		() => (courseId, moduleId, chapter) => {
			dispatch({
				type: COURSES_ACTION_TYPES.ADD_NEW_CHAPTER,
				payload: {
					courseId,
					moduleId,
					chapter,
				},
			});
		},
		[dispatch]
	);

	const editCourse = useMemo(
		() => (courseId, courseData) => {
			dispatch({
				type: COURSES_ACTION_TYPES.EDIT_COURSE,
				payload: {
					courseId,
					courseData,
				},
			});
		},
		[dispatch]
	);

	const editChapter = useMemo(
		() => (courseId, moduleId, chapterId, chapter) => {
			dispatch({
				type: COURSES_ACTION_TYPES.EDIT_CHAPTER,
				payload: {
					courseId,
					moduleId,
					chapterId,
					chapter,
				},
			});
		},
		[dispatch]
	);

	const deleteCourse = useMemo(
		() => courseId => {
			dispatch({
				type: COURSES_ACTION_TYPES.DELETE_COURSE,
				payload: {
					courseId,
				},
			});
		},
		[dispatch]
	);

	const cloneCourse = useMemo(
		() => course => {
			dispatch({
				type: COURSES_ACTION_TYPES.CLONE_COURSE,
				payload: course,
			});
		},
		[dispatch]
	);

	useEffect(() => {
		if (state.courses.length > 0) {
			window.localStorage.setItem(
				'courses',
				JSON.stringify(state.courses)
			);
		}
	}, [state]);

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
				addNewModule,
				addNewChapter,
				editCourse,
				editChapter,
				deleteCourse,
				cloneCourse,
			}}
		>
			{children}
		</CoursesContext.Provider>
	);
};
