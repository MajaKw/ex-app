'use client'

import { trpc } from '@/src/utils/trpc'
import { SignOutButton } from "@clerk/nextjs"
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react'


export default function ToDo() {
    const { data: email } = trpc.users.email.useQuery();
    const { data: initialTasks = [], status } = trpc.tasks.all.useQuery();
    console.log(initialTasks)
    const [tasksList, setTasksList] = useState<{
        id: number;
        title: string | null;
    }[]>([]);
    const [newTask, setNewTask] = useState('');
    const mutation = trpc.tasks.add.useMutation({onSuccess: (task)=>{
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
    }, [setTasksList, status])

    const userData = useUser();
    console.log(userData)

    async function handleAddTask() {
        if (newTask.trim() === '') {
            alert('Task cannot be empty');
            return;
        }
        if(tasksList.length >= 20 ){
            alert( "You don't have subscription! " )
        }else{
            console.log(tasksList.length)
            mutation.mutate({title: newTask});
            
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