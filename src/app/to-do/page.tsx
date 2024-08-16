'use client'

import { SignOutButton } from "@clerk/nextjs"

export default function UserProfile(){
    return (
        <div>
            <SignOutButton />
            <div>Your toDo list:</div>
            <AddTaskButton/>
        </div>
    )
}

function AddTaskButton(){
    function handleClick(){
        alert('You clicked button AddTask')
    }


    return(
       <div>
            <label >Add task to Your list</label><br/>
            <input type="text"/><br/>
            <input type="submit" value="Submit" onClick={handleClick}/>
       </div>
    )
}

interface TaskProps {
    title: string,
    done: boolean
}

function Task({taskProps}:{taskProps : TaskProps}){
    return <li>{taskProps.title}</li>
}

// export default UserProfile;