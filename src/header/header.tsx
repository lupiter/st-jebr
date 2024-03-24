import "./header.css";
import { ROUTES } from "../routes";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <>
      <h1>
        st-jebr{" "}
        <img src="/st-jebr/logo.svg" alt="" width={30} height={30}/>
      </h1>
      <p role="caption" className="caption">
        stitch-(al)gebra
      </p>
      <nav>
        <ul>
          <li>
            <NavLink
              to={ROUTES.HOME.toString()}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Calculator
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.CARD.toString()}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Punch cards
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
