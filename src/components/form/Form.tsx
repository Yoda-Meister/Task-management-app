import { useDispatch } from 'react-redux';
import { tasksActions } from '../../store/tasks';
import { notificationsActions } from '../../store/notifications';
import { ChangeEvent, FC, FormEvent, Fragment, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from 'react-intl';
import { Task } from '../../models/task';

const Form: FC = () => {
	const dispatch = useDispatch();

	// Setup local state management
	const [taskText, setTaskText] = useState<string>("");
	const [isEmpty, setIsEmpty] = useState<boolean>(true);

	// Only check if input field is empty when taskText changes
	useEffect(() => {
		setIsEmpty(taskText.trim().length < 1);
	}, [taskText]);

	// onChangeHandler fires when the user types
	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskText(event.target.value);
	};

	// onSubmitHandler fires when the user submits a form
	const onSubmitHandler = (event: FormEvent) => {
		event.preventDefault();

		// Get the current timestamp
		const date = Date.now();

		// Create the task object
		const task: Task = {
			completed: false,
			createdAt: date,
			id: date,
			text: taskText
		};

		// Add it to the list
		dispatch(tasksActions.addTask(task));

		// Show a notification
		dispatch(notificationsActions.setShow(true));

		// Reset the input field to empty
		setTaskText("");
	}

	const placeholder = useIntl().formatMessage({ id: "components.form.placeholder" });

	return (
		<Fragment>
			<h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
				<FormattedMessage
					id="components.form.title"
					description="The title of the form"
					defaultMessage="Add another task"
				/>
			</h3>
			<div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300">
				<p>
					<FormattedMessage
						id="components.form.description"
						description="The description of the form"
						defaultMessage="Just when you thought your task list couldn't get any longer, you came up with something else!"
					/>
				</p>
			</div>
			<form className="mt-5 sm:flex sm:items-center" onSubmit={onSubmitHandler}>
				<div className="w-full sm:max-w-xs">
					<label htmlFor="task" className="sr-only">
						task
					</label>
					<input
						type="text"
						name="task"
						id="task"
						className="dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 block w-full sm:text-sm border-gray-300 dark:border-transparent rounded-md"
						placeholder={placeholder}
						autoComplete="none"
						onChange={onChangeHandler}
						value={taskText}
					/>
				</div>
				<button
					type="submit"
					disabled={isEmpty}
					className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-2 md:ml-5 sm:w-auto sm:text-sm disabled:opacity-50 dark:disabled:opacity-60"
				>
					<FormattedMessage
						id="components.form.button"
						description="The text inside the button to add a task"
						defaultMessage="Add task"
					/>
				</button>
			</form>
		</Fragment>
	);
}

export default Form;