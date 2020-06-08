import React, {useState, useEffect} from 'react';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, UncontrolledButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { RedirectPage } from '../helpers/redirectPage';


const NavMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [navs, setNavs] = useState([])
    const [load, setLoad] = useState(true)
    const Navs = {
        admin: [
            {title: 'Home', options : null, route: '/admin/dashboard'},
            {title: 'Settings', options: [
                {name: 'Update profile', route: '/admin/update_profile'},
                {name: 'Change password', route:'/admin/change_pass'}
            ]},
            {title: 'Clients', options: null, route: '/admin/clients'},
            {title: 'Categories', options: null, route:'/admin/categories'},
            {title: 'Currencies', options: null, route: '/admin/currencies'},
            {title: 'Log Out', options: null, route: '', action: () => {Logout()}}
        ],
        client: [
            {title: 'Home', options : null, route: '/client/dashboard'},
            {title: 'Profile', options: null, route: '/client/profile'},
            {title: 'Categories Personal', options : null, route: '/client/categories'},
            {title: 'Finance', options: null, route: '/client/finance_list'},
            {title: 'Report Finance', options: null, route: '/client/finance_report'},
            {title: 'Log Out', options: null, route: '', action: () => {Logout()}}
        ]
    }

    const Logout = () => {
        localStorage.clear();
        RedirectPage('/')
    }

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const HandleChangeMenu = () => {
            const user_data = JSON.parse(localStorage.getItem('user_data'));
            if(user_data.role === 'administrador') {
                setNavs(Navs.admin)
            } else {
                setNavs(Navs.client)
            }
            setLoad(false)
        }

        HandleChangeMenu();
    },[])

    return(
        <>
            {
                !load &&
                <Navbar className='navbar-menu' expand='xl' dark>
                    <NavbarToggler onClick={toggle} className='nav-toggle mr-2' />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {
                                navs.map((nav, key) => (
                                    <NavItem key={key}>
                                        {
                                            nav.options === null?
                                                nav.action === undefined?
                                                    <NavLink className='nav-item-name' to={nav.route}>{nav.title}</NavLink>
                                                :
                                                    <NavLink className='nav-item-name' to={nav.route} onClick={nav.action}>{nav.title}</NavLink>
                                        :
                                                <UncontrolledButtonDropdown>
                                                    <DropdownToggle tag='span' className='nav-link'>
                                                        <span className='nav-item-name'>{nav.title}</span>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        {
                                                            nav.options.map((item) => ((
                                                                <DropdownItem href={item.route}>{item.name}</DropdownItem>
                                                            )))
                                                        }
                                                    </DropdownMenu>
                                                </UncontrolledButtonDropdown>
                                        }
                                    </NavItem>
                                ))
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            }
        </>
    )
}

export default NavMenu;