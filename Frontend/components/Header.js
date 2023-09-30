import Logo from './Logo'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import { classNames } from '../utils/classNames'

const styles = {
    wrapper: 'flex items-center space-x-10',
    container: 'flex flex-1 justify-between',
    navBar: 'flex items-center space-x-6',
    navItem: 'cursor-pointer',
    menuBox: 'relative inline-block text-left',
    menuButton: 'flex items-center rounded-full  text-white hover:text-gray-200 focus:outline-none',
    menuIcon: 'h-5 w-5',
    menuItems: 'absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
    menuItemsContainer: 'py-1',
    menuItem: 'block w-full px-4 py-2 text-left text-sm',
    buttonActive: 'bg-gray-100 text-gray-900',
    buttonInactive: 'text-gray-700',
}

const transitions = {
    menuEnter: 'transition ease-out duration-100',
    menuEnterFrom: 'transform opacity-0 scale-95',
    menuEnterTo: 'transform opacity-100 scale-100',
    menuLeave: 'transition ease-in duration-75',
    menuLeaveFrom: 'transform opacity-100 scale-100',
    menuLeaveTo: 'transform opacity-0 scale-95',
}

const Header = ({ logout, isAdmin, inAllowlist, joinAllowlist, downloadAllowlist }) => {
    return (
        <header className={styles.wrapper}>
            <Logo />

            <div className={styles.container}>
                <ul className={styles.navBar}>
                    <li className={styles.navItem}>Products</li>
                    <li className={styles.navItem}>Marketplace</li>
                    <li className={styles.navItem}>Gallery</li>
                </ul>

                <Menu as="div" className={styles.menuBox}>
                    <div>
                        <Menu.Button className={styles.menuButton}>
                            <MenuIcon className={styles.menuIcon} />
                        </Menu.Button>
                    </div>

                    <Transition as={Fragment} enter={transitions.menuEnter} enterFrom={transitions.menuEnterFrom} enterTo={transitions.menuEnterTo} leave={transitions.menuLeave} leaveFrom={transitions.leaveFrom} leaveTo={transitions.menuLeaveTo}>
                        <Menu.Items className={styles.menuItems}>
                            <div className={styles.menuItemsContainer}>
                                {!inAllowlist && (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button onClick={joinAllowlist} className={classNames(active ? styles.buttonActive : styles.buttonInactive, styles.menuItem)}>
                                                Join Allowlist
                                            </button>
                                        )}
                                    </Menu.Item>
                                )}
                                {isAdmin && (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button onClick={downloadAllowlist} className={classNames(active ? styles.buttonActive : styles.buttonInactive, styles.menuItem)}>
                                                Download Allowlist
                                            </button>
                                        )}
                                    </Menu.Item>
                                )}
                                <Menu.Item>
                                    {({ active }) => (
                                        <button onClick={logout} className={classNames(active ? styles.buttonActive : styles.buttonInactive, styles.menuItem)}>
                                            Disconnect
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </header>
    )
}

export default Header
