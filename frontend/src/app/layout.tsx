import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { Providers } from './providers'
import { ThemeRegistry } from './theme-provider'
import { LocalizationRegistry } from './localization-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'DS Delayed - Відкладені повідомлення Telegram',
  description: 'Додаток для створення відкладених повідомлень в Telegram з нагадуваннями про заняття',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body>
        <Providers>
          <AppRouterCacheProvider>
            <LocalizationRegistry>
              <ThemeRegistry>
                {children}
              </ThemeRegistry>
            </LocalizationRegistry>
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  )
} 