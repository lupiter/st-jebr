import "./header.css";
import { ROUTES } from "../routes";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <>
      <h1>
        st-jebr{" "}
        <svg className="logo" viewBox="0 0 100 50" width={100} height={50}>
          <polyline
            points="0,49 30,49 30,40 50,40 50,30 60,30 60,20 70,20 70,10 80,10 80,1"
            fill="none"
            stroke="black"
            strokeWidth={2}
          />
        </svg>
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
