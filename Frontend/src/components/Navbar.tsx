import { Container } from "./Container";
import logoWhite from "../assets/logo_white.jpg";
import logoDark from "../assets/logo_dark.jpg";
import { NavItem } from "./NavItem";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Github", path: "https://github.com/mcsebe/Visual-Time-Series" },
    { name: "Creator", path: "https://www.linkedin.com/in/sebasti%C3%A1n-luarte-becar-4a458b222/" },
];


export const Navbar = () => { 
    return (
        <header className="absolute inset-x-0 top-0 z-50 py-3">
            <Container className="flex items-center justify-between">
                <nav className="w-full flex justify-between gap- relative">
                    <div className="min-w-max inline-flex relative">
                        <a href="/" className="relative flex items-center gap-3">
                            <img src={logoWhite} alt="Logo" className="h-15" />
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

                    <div className="min-w-max flex item-center gap-x-3">
                            <button className={toogleTheme}>Get Started</button>
                    </div>
                </nav>
            </Container>
        </header>
    );
}