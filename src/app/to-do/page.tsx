'use client'

import { trpc } from '@/src/utils/trpc'
import { SignOutButton } from "@clerk/nextjs"
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react'

interface Task {
    title: string | null,
    id: number
}

export default function ToDo() {
    const { data: email } = trpc.users.email.useQuery();
    const { data: initialTasks = [], status } = trpc.tasks.all.useQuery();
    console.log(initialTasks)
    const [tasksList, setTasksList] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const taskMutation = trpc.tasks.add.useMutation({onSuccess: (task: Task[])=>{
        console.log(task)
        setTasksList([
            ...tasksList,
            task[0]
        ])
    }});
    useEffect(()=>{
        if (status==="success"){
            setTasksList(initialTasks)
        }
    }, [setTasksList, [status]])

    const { user } = useUser();
    const publicMetadata = user?.publicMetadata!;

    async function handleAddTask() {
        if (newTask.trim() === '') {
            alert('Task cannot be empty');
            return;
        }
        console.log(tasksList.length)
        if(tasksList.length >= 3 && !publicMetadata.subscription){
            window.open('http://localhost:3000/stripe','Buy subscription','width=700,height=700');
        }else{
            console.log(tasksList.length)
            taskMutation.mutate({title: newTask});
            setNewTask(''); 
        }
    }

    return (
        <div>
            <SignOutButton />
            <p>Your email is: {email}</p>
            <div>Your toDo list:</div>
            <ul>
                {tasksList.map((task) => (
                    <li key={task.id}>{task.title}</li> 
                ))}
            </ul>
            <div>
                <label>Add task to Your list</label><br />
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                /><br />
                <input
                    type="button" 
                    value="Submit"
                    onClick={handleAddTask}
                />
            </div>
        </div>
    );
}

interface TaskProps {
    title: string,
    done: boolean
}

function Task({taskProps}:{taskProps : TaskProps}){
    return <li>{taskProps.title}</li>
}

// export default UserProfile;