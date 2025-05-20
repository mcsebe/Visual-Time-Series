import { useEffect } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

export const Layout = ({ title, children }: LayoutProps) => {
    useEffect(() => {
        document.title = title;
    }
    , [title]);
    return (
        <>
            <Navbar />
                <main className="flex flex-col overflow-hidden pt-[80px]">{children}</main>
            <Footer/>
        </>
    );
};