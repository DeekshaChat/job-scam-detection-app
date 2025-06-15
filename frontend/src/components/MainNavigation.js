import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {

  const token = useRouteLoaderData('root');
console.log('token====', token);

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to={'/'} className={({ isActive }) => isActive ? classes.active : undefined}>Home</NavLink>
          </li>
          <li>
            <NavLink
              to="/visuals"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Visual Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Jobs
            </NavLink>
          </li>
          {!token && 
            (
              <li>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
            )
          }
          {
            token && (
            <li>
              <Form method="post" action="/logout">
                <button className={classes.logout_btn}>Logout</button>
              </Form>
            </li>
            )
          }
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;