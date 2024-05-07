import { configureStore } from "@reduxjs/toolkit";
import { notificationsReducer } from "./notifications";
import { tasksReducer } from "./tasks";
import { themesReducer } from "./themes";
import { localesReducer } from "./locales";
import { save, load } from "redux-localstorage-simple";

const store = configureStore({
	middleware: [
		save({
			states: ["tasks", "themes", "locales"],
			namespace: "task.lexvanderwerff.com",
			namespaceSeparator: "-"
		})
	],
	reducer: {
		locales: localesReducer,
		tasks: tasksReducer,
		themes: themesReducer,
		notifications: notificationsReducer
	},
	preloadedState: load({
		states: ["tasks", "themes", "locales"],
		namespace: "task.lexvanderwerff.com",
		namespaceSeparator: "-"
	})
});

export type RootState = ReturnType<typeof store.getState>
export default store;