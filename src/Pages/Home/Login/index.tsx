import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function () {

    const form = useForm({
        initialValues: {
            username: "",
            password: ""
        }
    });

    const submit = async (data: typeof form.values) => {

    }

    return (
        <form onSubmit={form.onSubmit(submit)}>
            <TextInput
                label={"Username"}
                withAsterisk
                {...form.getInputProps("username")}
                placeholder={"Type your username here"}
            />
            <div className="my-2" />
            <TextInput
                label={"Password"}
                withAsterisk
                {...form.getInputProps("password")}
                type={"password"}
                placeholder={"Type your password here"}
            />
            <Button className="mt-3" fullWidth type="submit">
                Login
            </Button>
        </form>
    )
}