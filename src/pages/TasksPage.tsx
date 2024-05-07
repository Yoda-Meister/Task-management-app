import { FC, Fragment } from "react";
import {
  BadgeCheckIcon,
  ClipboardListIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import Card from "../components/ui/Card";
import SearchSort from "../components/searchsort/SearchSort";
import Form from "../components/form/Form";
import Empty from "../components/task/Empty";
import TaskList from "../components/task/TaskList";
import { useSelector, useDispatch } from "react-redux";
import ListContainer from "../components/ui/ListContainer";
import { RootState } from "../store";
import { Task } from "../models/task";
import RadioGroup from "../components/searchsort/RadioGroup";
import { TASKS_FILTER_TYPE } from "../constants";
import { tasksActions } from "../store/tasks";
import React from "react";

export const FilterOptions = [
  {
    id: TASKS_FILTER_TYPE.SHOW_ALL,
    title: "All",
    icon: () => <ClipboardListIcon className="w-5 h-5" />,
  },
  {
    id: TASKS_FILTER_TYPE.SHOW_COMPLETED,
    title: "Completed",
    icon: () => <BadgeCheckIcon className="w-5 h-5" />,
  },
  {
    id: TASKS_FILTER_TYPE.SHOW_PENDING,
    title: "Pending",
    icon: () => <ExclamationIcon className="w-5 h-5" />,
  },
];

const TasksPage: FC = () => {
  // Get some store values
  const searchText = useSelector((state: RootState) => state.tasks.searchText);
  const sortMethod = useSelector((state: RootState) => state.tasks.sortMethod);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filterType = useSelector((state: RootState) => state.tasks.filterType);

  const dispatch = useDispatch();

  // Sort the array
  let sortedtasks: Task[] = [];

  if (sortMethod.key === 1) {
    sortedtasks = [...tasks].sort((a, b) => (a.text > b.text ? 1 : -1));
  }
  if (sortMethod.key === 2) {
    sortedtasks = [...tasks].sort((a, b) => (a.text < b.text ? 1 : -1));
  }
  if (sortMethod.key === 3) {
    sortedtasks = [...tasks].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
  }
  if (sortMethod.key === 4) {
    sortedtasks = [...tasks].sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : -1
    );
  }

  
  // Filter the sorted array based on search text
  const searchedtasks = sortedtasks.filter((task) =>
    task.text.toLowerCase().includes(searchText.toLowerCase())
);

const hastasks = tasks.length > 0;

const handleFilterChange = (id: string) => {
  dispatch(tasksActions.setFilterType(id));
};

const filteredTasks = React.useMemo(() => {
  if (filterType === TASKS_FILTER_TYPE.SHOW_ALL) {
    return searchedtasks;
  } else if (filterType === TASKS_FILTER_TYPE.SHOW_COMPLETED) {
    return searchedtasks.filter((task) => task.completed);
  } else if (filterType === TASKS_FILTER_TYPE.SHOW_PENDING) {
    return searchedtasks.filter((task) => !task.completed);
  }
  return searchedtasks;
}, [searchedtasks, filterType]);

  return (
    <Fragment>
      <Card>
        <Form />
      </Card>
      <Card>
        <SearchSort searchValue={searchText} />
      </Card>
      {!hastasks && <Empty />}
      <ListContainer>
        <RadioGroup
          onChange={handleFilterChange}
          options={FilterOptions}
          defaultChecked={TASKS_FILTER_TYPE.SHOW_ALL}
        />
        <TaskList tasks={filteredTasks} />
      </ListContainer>
    </Fragment>
  );
};

export default TasksPage;
