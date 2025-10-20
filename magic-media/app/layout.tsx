import "./globals.css";

export const metadata = {
  title: "SocialHub - Connect with Friends",
  description: "A social media platform built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
