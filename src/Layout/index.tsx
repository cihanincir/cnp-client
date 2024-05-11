import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import "@/Stylesheets/global.scss";
import Pages from '@/Pages';

export default function () {
    return (
        <MantineProvider>
            <Pages />
        </MantineProvider>
    )
}