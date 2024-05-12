import ArrayColumItems from "@/Components/ArrayColumItems";
import useFetch from "@/Hooks/Fetch";
import { IFetchMethod } from "@/Hooks/Fetch/types";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

export default function () {

    const { refetch, loading } = useFetch({
        endpoint: "users/register",
        method: IFetchMethod.Post,
        effectsFetch: false,
        onError(error: any) {
            if (Array.isArray(error)) {
                notifications.show({ message: <ArrayColumItems items={error} />, color: "red" });
            } else {
                notifications.show({ message: error, color: "red" });
            }
        },
        onComplete() {
            notifications.show({ title: "Success", message: "Account has been created successfully.", color: "green" });
        }
    });

    const form = useForm({
        initialValues: {
            username: "",
            password: ""
        }
    });

    const submit = async (data: typeof form.values) => {
        refetch(data);
    }

    return (
        <form onSubmit={form.onSubmit(submit)} className={"relative"}>
            <LoadingOverlay visible={loading} />
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
                Register
            </Button>
        </form>
    )
}