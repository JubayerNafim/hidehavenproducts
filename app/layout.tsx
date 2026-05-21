import "./globals.css";

export const metadata = {
  title: "Hide Haven - Featured Layer",
  description: "Seasonal collection highlights and customer favorites."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
