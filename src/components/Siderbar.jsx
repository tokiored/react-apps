import './Sidebar.css'

import DashboardIcon from './../assets/dashboard_icon.svg'
import AddIcon from './../assets/add_icon.svg'
import { NavLink } from 'react-router-dom'

import Avatar from './Avatar'
import { useAuthContext } from 'hooks/useAuthContext'

export default function Siderbar() {
    const { user } = useAuthContext()

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                    <Avatar src={null} initial={user.displayName[0]} />
                    <p>Hey {user.displayName}</p>
                </div>
                <nav>
                    <ul className="links">
                        <li>
                            <NavLink to="/">
                                <img src={DashboardIcon} alt="dashboard" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="create project" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
