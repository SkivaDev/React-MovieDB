import React, { useEffect, useRef } from 'react'
import "./Header.scss"
import logo from "../../assets/tmovie.png"
import { Link, useLocation } from 'react-router-dom'

const headerNav = [
  {
    display: 'Home',
    path: "/"
  },
  {
    display: 'Movies',
    path: "/movie"
  },
  {
    display: 'TV Series',
    path: "/tv"
  },
]

function Header() {

  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex(elem => elem.path === pathname);
  console.log("activeEs: " , active);

  useEffect(() => {
    const shrinkHeader = () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            headerRef.current.classList.add('shrink');
        } else {
            headerRef.current.classList.remove('shrink');
        }
    }
    window.addEventListener('scroll', shrinkHeader);
    return () => {
        window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);  

  return (
    <div ref={headerRef} className='header'>
      <div className='header__wrap container'>
        <div className='logo'>
          <img src={logo} alt="" />
          <Link to='/'>tMovies</Link>
        </div>
        <ul className='header__nav'>
          {
            headerNav.map((e, i) => (
              <li key={i} className={`${i === active}`}>
                <Link to={e.path}>
                  {e.display}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Header