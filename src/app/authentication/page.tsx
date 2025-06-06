'use server';

import AuthenticationForm from "./components/authentication-form";


export default async function page() {


    return (
        <div className="size-full grid place-content-center">
            <AuthenticationForm />
        </div>
    );
}