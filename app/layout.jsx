import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { instrumentSans } from "./styles/fonts";

export const metadata = {
  title: "Next Ai",
  description: "Next AI App.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSans.className} `}>
        <Navbar />
        <main className="flex flex-col pt-20 px-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
