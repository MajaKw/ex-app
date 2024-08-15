import { SignIn } from "@clerk/nextjs";

export default function SignInPage(){
    return (
    <div>
        Please Sign in
        <SignIn />
    </div>
    )
}