import * as React from 'react'
import {createRootRoute, Link, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import '../App.css'
import '@mantine/notifications/styles.css';
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import { mantineTheme } from "@/lib/themes/teal-theme.ts"
import { Notifications } from "@mantine/notifications";

const queryClient = new QueryClient()

export const Route = createRootRoute({
	component: () => (
		<>
			<MantineProvider theme={mantineTheme}>
        <QueryClientProvider client={queryClient}>
          <Notifications />
          <div className="min-h-screen p-6 bg-gray-50">
            <Outlet />
          </div>
          <TanStackRouterDevtools />
        </QueryClientProvider>
      </MantineProvider>

    </>
  ),
})
