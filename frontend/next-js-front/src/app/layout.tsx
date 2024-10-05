import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full overflow-y-hidden">
        <div>
          <Navbar/>
        </div>
        {children}
      </body>
    </html>
  );
}
