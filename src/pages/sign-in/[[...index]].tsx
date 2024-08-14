import { SignIn } from "@clerk/nextjs";

export default function Page(){
    return (
    <div>
        Please Sign in
        <SignIn />
    </div>
    )
}