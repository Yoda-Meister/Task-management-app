import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

describe('taskList component', () => {
	test('renders a list of zero tasks', () => {
		const tasks: any[] = [];
		render(<TaskList tasks={tasks} />);
		const elements = screen.queryAllByRole('listitem');
		expect(elements).toHaveLength(0);
	});
});
