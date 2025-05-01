import React, { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
    Link as HLink
} from "@heroui/react";
import { Link, useLocation } from 'react-router-dom';
import { ThemeSwitcher } from "./ThemeSwitcher";
import { addToast, Tooltip } from "@heroui/react";
import { MyButton } from "./MyButton";

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [closeLoading, setCloseLoading] = useState(false);
    const [userActive, setUser] = useState(() => {
        const storedUser = localStorage.getItem('userActive');
        return storedUser ? JSON.parse(storedUser).name : '';
    });
    const location = useLocation();

    const menuItems = [
        "Cartelera",
        "Cine",
        "Contacto",
    ];

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem('userActive');
            setUser(JSON.parse(storedUser)?.name || '');
        }

        window.addEventListener("userActiveUpdated", handleStorageChange);
        return () => {
            window.removeEventListener("userActiveUpdated", handleStorageChange);
        }
    }, []);

    return (
        <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} className="border-b border-white/70 ">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link
                        className="font-bold text-inherit"
                        to='/'
                    >CINEMA</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-6" justify="between">
                <NavbarItem isActive={location.pathname === "/cartelera"}>
                    <Link to="/cartelera" className={location.pathname === "/cartelera" ? "text-primary" : "text-foreground"}>
                        Cartelera
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={location.pathname === "/cine"}>
                    <Link to="/cine" className={location.pathname === "/cine" ? "text-primary" : "text-foreground"}>
                        Cine
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={location.pathname === "/contacto"}>
                    <Link to="/contacto" className={location.pathname === "/contacto" ? "text-primary" : "text-foreground"}>
                        Contacto
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="translate-y-1 ">
                    <ThemeSwitcher />
                </NavbarItem>
                <NavbarItem>
                    {
                        userActive ? (
                            <Tooltip content="Cerrar Sesion">
                                <MyButton
                                    id={'btn-logout'}
                                    color="danger"
                                    onPress={() => {
                                        setCloseLoading(true)

                                        addToast({
                                            title: "Cerrando Sesion",
                                            description: "Estamos cerrando sesion.",
                                            color: 'danger',
                                            timeout: 3000,
                                            shouldShowTimeoutProgress: true,
                                        })

                                        setTimeout(() => {
                                            localStorage.removeItem("userActive")
                                            window.dispatchEvent(new Event("userActiveUpdated"))
                                            setUser("")
                                            setCloseLoading(false)
                                        }, 3000)

                                    }}
                                    className="text-foreground "
                                    text={userActive}
                                    variant="bordered"
                                    isLoading={closeLoading}
                                />
                            </Tooltip>

                        ) : (
                            <Button as={HLink} href="/login" color="primary" radius="full" variant="shadow">
                                Login
                            </Button>
                        )
                    }

                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            to={`/${item.toLowerCase()}`}
                            className={location.pathname === `/${item.toLowerCase()}` ? "text-primary" : "text-foreground"}
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
                {
                    userActive ? (

                        <MyButton
                            color="danger"
                            onPress={() => {
                                setCloseLoading(true)

                                addToast({
                                    title: "Cerrando Sesion",
                                    description: "Estamos Cerrando Sesion.",
                                    color: 'danger',
                                    timeout: 3000,
                                    shouldShowTimeoutProgress: true,
                                })

                                setTimeout(() => {
                                    localStorage.removeItem("userActive")
                                    window.dispatchEvent(new Event("userActiveUpdated"))
                                    setUser("")
                                    setCloseLoading(false)
                                }, 3000)

                            }}
                            className="text-foreground"
                            text={'Cerrar sesión'}
                            variant="bordered"
                            title='Cerrar Sesion'
                        />
                    ) : (
                        <div className="hidden"></div>
                    )
                }
            </NavbarMenu>
        </Navbar>
    )
}
