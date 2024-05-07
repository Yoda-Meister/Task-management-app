import { FC } from 'react';
import FadeIn from 'react-fade-in';
import { Task } from '../../models/task';
import TaskListItem from './TaskListItem';

const TaskList: FC<{ tasks: Task[] }> = (props) => {
	return (
		<div className="bg-white dark:bg-gray-800 shadow dark:shadow-md overflow-hidden rounded-lg">
			<ul className="divide-y divide-gray-200 dark:divide-gray-700">
				<FadeIn transitionDuration={400} delay={250}>
					{props.tasks.map((task) =>
						<TaskListItem task={task} key={task.id} />
					)}
				</FadeIn>
			</ul>
		</div>
	);
};

export default TaskList;