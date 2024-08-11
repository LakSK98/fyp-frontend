import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

// Styled components for the navigation bar
const NavBarContainer = styled.nav`
  background-color: #1f1f1f;
  padding: 20px 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const NavBrand = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #e0e0e0;
  text-decoration: none;
  font-size: 18px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #333;
    color: #ffffff;
  }
`;

const NavBar = () => {
  return (
    <NavBarContainer>
      <NavBrand>Eye Disease Detection System</NavBrand>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
      </NavLinks>
    </NavBarContainer>
  );
};

export default NavBar;