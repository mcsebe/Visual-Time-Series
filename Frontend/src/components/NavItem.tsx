interface NavItemProps {
    name: string;
    path: string;
}

export const NavItem = ({name, path}: NavItemProps) => {
    return (
        <li>
            <a href={path} className="duration-300 font-medium ease-linear hover-primary py-3">
                {name}
            </a>
        </li>
    );
}