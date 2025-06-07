"use client"

//form evaluation
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";

//shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { ClipLoader } from "react-spinners";

//typed api request/response cycle
import APIResponse from "@/interfaces/api-response";

//interactive hooks
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

//schema to evaluate form
const formSchema = zod.object({
    name: zod.string()
        .min(4, { message: "Username must be at least 4 characters.", })
        .max(24, { message: "name must be less than 25 characters." }),
    password: zod.string()
        .min(4, { message: "password must be at least 4 characters" })
        .max(24, { message: "password must be less than 25 characters" })
})

export default function AuthenticationForm() {

    //mount router and stateful pending
    const router = useRouter();
    const [pending, setPending] = useState<boolean>(false);

    //initialize form with default values
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            password: "",
        },
        criteriaMode: "all",
    })

    async function onSubmit(values: zod.infer<typeof formSchema>) {
        if (pending) return;
        setPending(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("password", values.password);

        const options: RequestInit = { method: "POST", body: formData };

        const url = "/api/authentication/login";

        const response = await fetch(url, options);
        const data: APIResponse = await response.json();
        if (data.success) router.push("/dashboard");

        setPending(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="border-2 flex flex-col gap-4 p-4 rounded-lg">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant={"default"} type="submit">
                    {pending ? <ClipLoader size={16} /> : "Submit"}
                </Button>
            </form>
        </Form>
    )
}