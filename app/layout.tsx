export const metadata = {
  title: 'Vibe Coders — Project Board',
  description: 'A clean, simple, dark-mode Kanban + Todos + Notes',
};

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
