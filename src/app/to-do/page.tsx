export default function UserProfile(){
    return (
        <div>
            <div>Your toDo list:</div>
            <ul>
            
            </ul>
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