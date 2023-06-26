import React, { useContext } from 'react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { ThemeConsumer, AuthContext } from '@context/index';
import { logout, logoutRequesting } from '@store/auth/actions';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
/**
 * Header component with theme switcher.
 * @returns {React.FC} React FC without any props.
 */
const Header: React.FC = () => {
  const { auth, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    if (!auth.token) return;
    dispatch(logoutRequesting({}));
    const response = await logout(auth.token);
    dispatch(response);
  };

  return (
    <header className="light-bb">
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav ml-auto">
            <Dropdown className="header-custom-icon">
              <ThemeConsumer>
                {({ theme, updateTheme }) => (
                  <Button variant="default" onClick={updateTheme} data-testid="darkTheme">
                    {theme === 'light' ? (
                      //   <img data-testid="moon-icon" src="/images/moon.svg" />
                      <DarkMode color="inherit" />
                    ) : (
                      //   <img data-testid="sunny-icon" src="/images/sunny.svg" />
                      <LightMode />
                    )}
                  </Button>
                )}
              </ThemeConsumer>
              <Button variant="default" onClick={handleLogout} data-testid="darkTheme">
                Logout
              </Button>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
