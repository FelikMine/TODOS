import React, {useState, useRef} from "react";
import "./InputBlock.css";
import Tasks from "./Tasks.tsx";

interface Task {
    id: number;
    text : string;
    completed: boolean;
}

export default function InputBlock () {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTasks, setActiveTasks] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
    const [allTasks, setAllTasks] = useState<'all' | 'active' | 'completed'>('all');

    const taskRefs = useRef([]);

    function AddTask(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const taskValue = event.target.elements.tasks__input.value;

        if (!taskValue.trim()) return;

        const newTask = {
            id: Date.now(), // unique
            text: taskValue,
            completed: false,
        };

        setTasks((lastTasks) => [...lastTasks, newTask]);
        setActiveTasks((lastTasks) => [...lastTasks, newTask]);
    }

    console.log(tasks.map((task) =>
        task.id === 10 ? { ...task, completed: !task.completed } : task ));


    function toggleTaskCompletion(taskId: number) {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );

        setTasks(updatedTasks);

        setActiveTasks(updatedTasks.filter((task) => !task.completed));
        setCompletedTasks(updatedTasks.filter((task) => task.completed));
    }

    function showAll() {
        setAllTasks('all');
    }
    function showActive() {
        setAllTasks('active');
    }
    function showComplete () {
        setAllTasks('completed');
    }
    function clearCompleted() {
        setTasks((lastTasks) => lastTasks.filter((task) => !task.completed));
        setCompletedTasks([]);
    }

    function show() {

        let tasksToShow: Task[] = [];
        switch (allTasks) {
            case 'all':
                tasksToShow = tasks;
                break;
            case 'active':
                tasksToShow = activeTasks;
                break;
            case 'completed':
                tasksToShow = completedTasks;
                break;
            default:
                tasksToShow = [];
        }

        return tasksToShow.map((task) => (
            <div className="tasks__check" key={task.id}>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                />
                <label>{task.text}</label>
            </div>
        ));
    }

    return (
        <>
            <div id="tasks">
                <form onSubmit={AddTask}>
                    <input type="text" name="tasks__input" id="tasks__input" placeholder="What needs to be done?" />
                </form>

                <div id="tasks__list">
                   {show()}
                </div>

                <div id="tasks__footer">
                    <span> {activeTasks.length} items left </span>

                    <div>
                        <button onClick={showAll} >All</button>
                        <button onClick={showActive} >Active</button>
                        <button onClick={showComplete}>Completed</button>
                    </div>

                    <button onClick={clearCompleted}>Clear completed</button>
                </div>

            </div>
        </>
    )
}