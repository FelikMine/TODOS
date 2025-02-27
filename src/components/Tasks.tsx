import React, {useState} from 'react';
import "./Tasks.css";

export default function Tasks ({tasks, setTasks}) {

    return (
        <>
            <div id="tasks__list">
                <div>
                    {tasks}
                </div>
            </div>
        </>
    )
}