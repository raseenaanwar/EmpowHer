// Layout.jsx
import NavbarComponent from './NavbarComponent';
import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <NavbarComponent />
      <Header />
      {children}
    </>
  );
}

export default Layout;
