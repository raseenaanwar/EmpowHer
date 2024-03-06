import React from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AxiosInstance from '../../axiosinstance';
import { toast } from 'react-toastify';

function NavbarComponent({ isLoggedIn }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const refresh = JSON.parse(localStorage.getItem('refresh'));
    try {
      const res = await AxiosInstance.post("/logout/", { "refresh_token": refresh });
      console.log(res)
      if (res.status === 200) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        navigate("/login");
        toast.success("Logout Successfully");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" style={{ marginRight: 'auto' }}>
          <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Events</Nav.Link>
          </Nav>
          <Nav className="ml-auto"> {/* Align items to the right */}
            {isLoggedIn ? (
              <>
                <Nav.Link href="#deets">Find A Mentor</Nav.Link>
                <Nav.Link href="#deets">Discussion</Nav.Link>
                <Nav.Link href="#deets">Donation</Nav.Link>
                <Nav.Link href="#deets">Contact Us</Nav.Link>
                 <Nav.Link onClick={handleLogout}>Logout</Nav.Link> 
                <Nav.Link style={{ fontSize: '24px', color: 'white' }} as={Link} to="/profile">
                  <FontAwesomeIcon icon={faUserCircle} /> {/* Font Awesome user circle icon */}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="#deets">Find A Mentor</Nav.Link>
                <Nav.Link href="#deets">Discussion</Nav.Link>
                <Nav.Link href="#deets">Donation</Nav.Link>
                <Nav.Link href="#deets">Contact Us</Nav.Link>
                <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
