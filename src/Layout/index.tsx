import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import "@/Stylesheets/global.scss";
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

import Pages from '@/Pages';
import { Provider } from 'react-redux';
import { store } from '@/Store';

export default function () {
    return (
        <Provider store={store}>
            <MantineProvider>
                <Notifications />
                <Pages />
            </MantineProvider>
        </Provider>
    )
}