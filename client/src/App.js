import React from 'react';
import './App.css';
import Header from './components/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from './api/API';
import { Redirect, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { AuthContext } from './auth/AuthContext';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import LoginForm from './components/LoginForm';
import TicketForm from './components/TicketForm';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { authUser: null, authErr: null };
  }

  componentDidMount() {
    this.props.history.push("/ticket");
  }

  componentWillUnmount() {
    
  }


  handleErrors(err) {
    if (err) {
      if (err.status && err.status === 401) {
        this.setState({ authErr: err.errorObj });
      }
    }
  }

  // Add a logout method
  logout = () => {
    API.userLogout().then(() => {
      this.props.history.push("/");
    });
  }

  // Add a login method
  login = (username, password) => {
    API.userLogin(username, password).then(
      (user) => {
        this.setState({ authUser: user})
      }
    ).catch(
      (errorObj) => {
        const err0 = errorObj.errors[0];
        this.setState({ authErr: err0 });
      }
    );
  }

  render() {
    // compose value prop as object with user object and logout method
    const value = {
      authUser: this.state.authUser,
      authErr: this.state.authErr,
      loginUser: this.login,
      logoutUser: this.logout
    }
    return (
      <AuthContext.Provider value={value}>
        <Header />
        <Container fluid>
          <Switch>
            <Route path="/login">
              <Row className="vheight-100">
                <Col sm={4}></Col>
                <Col sm={4} className="below-nav">
                  <LoginForm />
                </Col>
              </Row>
            </Route>
            <Route path="/ticket">
              <Row className="vheight-100 below-nav">
                <TicketForm/>
              </Row>
            </Route>
          </Switch>
        </Container>
      </AuthContext.Provider>
    );
  }
}

export default withRouter(App);
