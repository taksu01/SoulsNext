import Link from "next/link";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home Page</Link>
          </li>
          <li>
            <Link href="/employee">New Employee</Link>
          </li>
          {/* <li>
            <Link href="/new-meetup">New emp</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
