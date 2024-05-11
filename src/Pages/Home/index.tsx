import { Tabs } from "@mantine/core";
import Register from "./Register";
import Login from "./Login";

export default function () {

    return (
        <div className="flex justify-center items-center w-screen h-screen overflow-hidden">
            <div className="bg-white shadow-md p-3 flex flex-col justify-center items-center rounded-sm w-80 h-64">
                <Tabs defaultValue="login" className="w-full h-full" keepMounted={false}>
                    <Tabs.List>
                        <Tabs.Tab value="login">
                            Login
                        </Tabs.Tab>
                        <Tabs.Tab value="register">
                            Register
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="login">
                        <div className="p-3">
                            <Login />
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="register">
                        <div className="p-3">
                            <Register />
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}