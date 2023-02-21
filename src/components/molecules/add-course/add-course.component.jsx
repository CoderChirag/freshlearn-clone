import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
	Grid,
	Paper,
	Typography,
	TextField,
	Select,
	OutlinedInput,
	MenuItem,
	ListItemText,
	Checkbox,
	InputLabel,
	Switch,
	Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { UserContext } from '../../../contexts/user/user.context';
import { CoursesContext } from '../../../contexts/courses/courses.context';

const CustomizedPaper = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	color: theme.palette.text.secondary,
	width: '100%',
	// lineHeight: '60px',
	padding: '20px 25px',
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const AddCourse = () => {
	const navigate = useNavigate();
	const { currentUser } = useContext(UserContext);
	const { courses, createNewCourse } = useContext(CoursesContext);

	// Form States
	// Course title
	const [title, setTitle] = useState('');
	// Course description
	const [description, setDescription] = useState('');
	// Author name for the course
	const [author, setauthor] = useState('');
	// Course visibility
	const [visibility, setVisibility] = useState('public');

	// Error Validations
	const [errors, setError] = useState([]);

	const names = [
		currentUser?.displayName
			.toLowerCase()
			.split(' ')
			.map(name => name[0].toUpperCase() + name.substring(1))
			.join(' '),
	];

	// Form Change Handlers
	const handleTitleChange = event => {
		setTitle(event.target.value);
	};

	const handleDescriptionChange = event => {
		setDescription(event.target.value);
	};

	const handleVisibilityChange = event => {
		setVisibility(prev => (prev === 'public' ? 'private' : 'public'));
	};

	const handleAuthorChange = event => {
		const {
			target: { value },
		} = event;
		setauthor(
			// On autofill we get a stringified value.
			value
		);
	};

	// Form Validator
	const validateForm = (titleCheck, descriptionCheck, authorCheck) => {
		let error = false;
		if (titleCheck) {
			if (title.trim().length === 0) {
				setError(prev =>
					prev.filter(err => err.component === 'title').length === 0
						? [
								...prev,
								{
									component: 'title',
									message: 'Course title is required',
								},
						  ]
						: [...prev]
				);
				error = true;
			} else {
				setError(prev => prev.filter(err => err.component !== 'title'));
			}
		}

		if (descriptionCheck) {
			if (description.trim().length === 0) {
				setError(prev =>
					prev.filter(err => err.component === 'description')
						.length === 0
						? [
								...prev,
								{
									component: 'description',
									message: 'Course title is required',
								},
						  ]
						: [...prev]
				);
				error = true;
			} else {
				setError(prev =>
					prev.filter(err => err.component !== 'description')
				);
			}
		}
		if (authorCheck) {
			if (author.trim().length === 0) {
				setError(prev =>
					prev.filter(err => err.component === 'author').length === 0
						? [
								...prev,
								{
									component: 'author',
									message: 'Course author is required',
								},
						  ]
						: [...prev]
				);
				error = true;
			} else {
				setError(prev =>
					prev.filter(err => err.component !== 'author')
				);
			}
		}

		return error;
	};

	const handleSubmit = event => {
		if (validateForm(true, true, true)) return;
		const course = {
			title,
			description,
			author,
			visibility,
			modules: [
				{
					title: 'Module 1',
					chapters: [
						{
							title: 'Chapter 1',
						},
					],
				},
			],
		};
		createNewCourse(course);
		console.log(course); // Here we can make a post request to send the generated data to backend
		navigate('/dashboard/products/courses/courses-list');
	};

	return (
		<Grid
			container
			flexDirection='column'
			alignItems='center'
			sx={{ height: '100%', paddingTop: '30px', paddingRight: '30px' }}
		>
			<Grid item sx={{ width: '45%' }}>
				<CustomizedPaper elevation={8}>
					<Grid container flexDirection='column'>
						<Grid
							item
							sx={{ textAlign: 'center', marginBottom: '40px' }}
						>
							<Typography variant='h6'>CREATE COURSE</Typography>
						</Grid>
						<Grid
							item
							sx={{
								display: 'flex',
								flexDirection: 'column',
								marginBottom: '20px',
							}}
						>
							<TextField
								error={
									errors.filter(
										err => err.component === 'title'
									).length > 0
								}
								id='title'
								label='Course Title'
								helperText={
									errors.filter(
										err => err.component === 'title'
									).length > 0
										? errors.filter(
												err => err.component === 'title'
										  )[0].message
										: ''
								}
								value={title}
								onChange={handleTitleChange}
								onBlur={event =>
									validateForm(true, false, false)
								}
								variant='outlined'
								placeholder='Input Text'
								size='normal'
							/>
						</Grid>
						<Grid
							item
							sx={{
								display: 'flex',
								flexDirection: 'column',
								marginBottom: '20px',
							}}
						>
							<TextField
								error={
									errors.filter(
										err => err.component === 'description'
									).length > 0
								}
								id='description'
								label='Description'
								helperText={
									errors.filter(
										err => err.component === 'description'
									).length > 0
										? errors.filter(
												err =>
													err.component ===
													'description'
										  )[0].message
										: ''
								}
								value={description}
								onChange={handleDescriptionChange}
								onBlur={event =>
									validateForm(false, true, false)
								}
								variant='outlined'
								placeholder='Input Text'
								size='normal'
								multiline
								rows={4}
							/>
						</Grid>
						<Grid
							item
							sx={{
								display: 'flex',
								flexDirection: 'column',
								marginBottom: '20px',
							}}
						>
							<InputLabel id='author-label'>
								Course Author
							</InputLabel>
							<Select
								error={
									errors.filter(
										err => err.component === 'author'
									).length > 0
								}
								labelId='author-label'
								id='author'
								value={author}
								onChange={handleAuthorChange}
								onBlur={event =>
									validateForm(false, false, true)
								}
								input={<OutlinedInput />}
								renderValue={selected => selected}
								MenuProps={MenuProps}
							>
								{names.map((name, index) => (
									<MenuItem key={index} value={name}>
										<Checkbox
											checked={author.indexOf(name) > -1}
										/>
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid
							item
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								marginBottom: '20px',
							}}
						>
							<Typography
								variant='p'
								sx={{ fontWeight: '600', marginLeft: '5px' }}
							>
								Public
							</Typography>
							<Switch
								aria-label='visibility-toggler'
								checked={visibility === 'public'}
								onClick={handleVisibilityChange}
							/>
						</Grid>
						<Grid
							item
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								marginBottom: '20px',
							}}
						>
							<Link
								to='/dashboard/products/courses/courses-list'
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant='outlined'
									sx={{ marginRight: '20px' }}
								>
									Cancel
								</Button>
							</Link>
							<Button variant='contained' onClick={handleSubmit}>
								Create Course
							</Button>
						</Grid>
					</Grid>
				</CustomizedPaper>
			</Grid>
		</Grid>
	);
};

export default AddCourse;
