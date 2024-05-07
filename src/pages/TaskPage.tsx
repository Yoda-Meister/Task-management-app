import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Card from '../components/ui/Card';
import ListContainer from '../components/ui/ListContainer';
import { RootState } from '../store';
import { getDateTime, getTimePassed } from '../utils/dates';

const TaskPage: FC = () => {
	const params = useParams();

	const tasks = useSelector((state: RootState) => state.tasks.tasks);
	const task = tasks.find(task => task.id.toString() === params.taskId);

	if (!task) {
		return (
			<Card>
				<p className="text-gray-900 dark:text-white">
					<FormattedMessage
						id="pages.taskpage.notfound"
						description="This tells the user the task was not found"
						defaultMessage="No task found for ID {taskId}"
						values={{
							taskId: params.taskId
						}}
					/>
				</p>
			</Card>
		);
	}

	const createdDate = new Date(task.createdAt);
	const dateTime = getDateTime(createdDate, false);
	const timePassed = getTimePassed(createdDate.getTime());

	return (
		<ListContainer>
			<div className="px-4 py-5 sm:px-6">
				<h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{task.text}</h3>
				<p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
					<FormattedMessage
						id="pages.taskpage.description"
						description="The subtitle of the task"
						defaultMessage="A little bit of information about the task."
					/>
				</p>
			</div>
			<div className="border-t border-gray-200 dark:border-gray-600 px-4 py-5 sm:p-0">
				<dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-600">
					<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
							<FormattedMessage
								id="pages.taskpage.added"
								description="The title of this piece of info"
								defaultMessage="Added on"
							/>
						</dt>
						<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
							<time dateTime={task.createdAt.toString()}>{dateTime}</time>
						</dd>
					</div>
					<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
							<FormattedMessage
								id="pages.taskpage.timepassed.title"
								description="The title of this piece of info"
								defaultMessage="Time passed"
							/>
						</dt>
						<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{timePassed} <FormattedMessage
							id="pages.taskpage.timepassed.minutes"
							description="The info of this piece of info"
							defaultMessage="Minutes"
						/></dd>
					</div>
				</dl>
			</div>
		</ListContainer>
	);
};

export default TaskPage;