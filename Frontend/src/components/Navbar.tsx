import { Container } from "./Container";
import logoWhite from "../assets/logo_white.jpg";
import logoDark from "../assets/logo_dark.jpg";
import { NavItem } from "./NavItem";
import { useThemeStore } from "../utils/ThemeStore";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Github", path: "https://github.com/mcsebe/Visual-Time-Series" },
    { name: "Let's Connect", path: "https://www.linkedin.com/in/sebasti%C3%A1n-luarte-becar-4a458b222/" },
];


export const Navbar = () => {
    const { toggleTheme, theme } = useThemeStore();

    return (
        <header className="absolute inset-x-0 top-0 z-50 py-3 shadow-color-1 px-8">
            <Container className="flex items-center justify-between">
                <nav className="w-full flex justify-between gap-6 relative">
                    <div className="min-w-max inline-flex relative">
                        <a href="/" className="relative flex items-center gap-3">
                            <img src={theme === "dark" ? logoDark: logoWhite} alt="Logo" className="h-15" />
                        </a>
                    </div>

                    <div className="flex flex-col lg:flex-row w-full lg:justify-between lg:items-center absolute 
                    top-full left-0 lg:static lg:top-0 bg-body lg:bg-transparent border-x border-x-box-border 
                    lg:border-x-0 lg:h-auto h-0 overflow-hidden">
                        <ul className="border-t border-box-border lg:border-t-0 px-6 lg:px-0 flex flex-col 
                        lg:flex-row gap-y-4 gap-x-10 text-xl text-heading-2 w-full lg:justify-center lg:items-denter">
                            {navItems.map((item, key) => (
                                <NavItem key={key} name={item.name} path={item.path} />
                            ))}
                        </ul>
                    </div>

                    <div className="min-w-max flex items-center gap-x-3 ">
                        <button onClick={toggleTheme}
                            className="outline-hidden flex relative text-heading-2 rounded-full p-3 border 
                            border-box-border cursor-pointer items-center h-12"
                            >
                            {theme === "dark" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" >
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 
                                        0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 
                                        21a9.753 9.753 0 009.002-5.998z"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 
                                        18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 
                                        3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </nav>
            </Container>
        </header>
    );
}