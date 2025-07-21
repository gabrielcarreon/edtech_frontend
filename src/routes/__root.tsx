import * as React from 'react'
import {createRootRoute, Link, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import '../App.css'
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import { mantineTheme } from "@/lib/themes/teal-theme.ts"

const queryClient = new QueryClient()

export const Route = createRootRoute({
	component: () => (
		<>
			<MantineProvider theme={mantineTheme}>
				<QueryClientProvider client={queryClient}>
					<Outlet/>
					<TanStackRouterDevtools/>
				</QueryClientProvider>
			</MantineProvider>
	
		</>
	),
})