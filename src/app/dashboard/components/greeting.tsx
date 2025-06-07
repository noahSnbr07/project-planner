'use server';

interface _props {
    name: string
}

export default async function Greeting({ name }: _props) {


    return (
        <p> Welcome Back, {name} </p>
    );
}