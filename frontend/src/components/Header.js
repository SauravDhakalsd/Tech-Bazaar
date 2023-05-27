// import React, { useState } from "react";
import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import SearchBox from "./SearchBox";
// import SearchByImage from './SearchByImage';
// import AISearch from "./AISearch";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  // const [search, setSearch] = useState("");
  // const [result, setResult] = useState([]);

  // const handleSearch = (input) => {
  //   input = input.toLowerCase().trim();
  //   setSearch(input);
  //   const arr = input.split(" ");

  // var all = [];

  // var exact = allProducts?.filter((found) => {
  //   var temp =
  //     found.fullName + " " + found.id + " " + found.brand + " " + found.color;
  //   temp = temp.toLowerCase();
  //   return (
  //     arr.every((item) => temp.includes(item)) ||
  //     found.url.toLowerCase().includes(input.replace("http", ""))
  //   );
  // });

  // all.push(...exact);

  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i].length < 2 || arr[i] === "I" || arr[i] === "to") {
  //     // all = [];
  //     continue;
  //   }

  //   var similar = allProducts?.filter((found) => {
  //     return (
  //       found.fullName.toLowerCase().includes(arr[i]) ||
  //       found.color.toLowerCase().includes(arr[i]) ||
  //       found.id.toLowerCase().includes(arr[i]) ||
  //       found.brand.toLowerCase().includes(arr[i]) ||
  //       found.url.toLowerCase().includes(input.replace("http", ""))
  //     );
  //   });
  //   all.push(...similar);
  // }

  // all = [...new Set(all)];
  // // shuffle(all);
  // setResult([...all]);
  // };

  return (
    <header>
      <Navbar bg="primary" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Tech Bazaar</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            {/* <Route render={({ history }) => <SearchByImage history={history} search={handleSearch} />} /> */}
            {/* <Route render={({ history }) => <SearchByImage history={history} />} /> */}
            {/* <AISearch /> */}
            <LinkContainer to="/AISearch">
              <Nav.Link>
                <Button type="submit" variant="success" className="p-2">
                  Search by AI
                </Button>
              </Nav.Link>
            </LinkContainer>
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
