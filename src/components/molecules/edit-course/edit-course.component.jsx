import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import AddCourse from '../add-course/add-course.component';
import { CoursesContext } from '../../../contexts/courses/courses.context';

const EditCourse = () => {
	const { courseId } = useParams();
	const { courses, editCourse } = useContext(CoursesContext);

	const handleEditCourse = courseData => {
		// Here we can make a PATCH request to backend to update the course
		console.log('Course Edited Successfully');
		console.log(courseData);
		editCourse(courseId, courseData);
	};

	return (
		<AddCourse
			edit={true}
			course={courses.find(course => course.id === courseId)}
			courseEditHandler={handleEditCourse}
		/>
	);
};

export default EditCourse;
