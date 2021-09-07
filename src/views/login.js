import { useState } from 'react';
import UserContext from './../context/UserContext';
import HomePage from './home';
import { Register } from './../components/register';
import { Container, Header, Content, Footer, FlexboxGrid, Panel, Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar, Navbar } from 'rsuite';

var qs = require('qs');
var axios = require('axios');

function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [token, setToken] = useState(null);
  const [state, setstate] = useState(null);
  const [entities, setEntities] = useState(null);

  var baseUrl = "";
  if (process.env.env = "production") {
    baseUrl = "https://godocash.herokuapp.com";
  } else {
    baseUrl = "http://localhost:3000";
  }

  const [user, setUser] = useState({
    name: null,
    email: null,
    phone: null,
    balance: null,
    history: null
  });

  // sessionHelpers

  const logout = () => {
    setstate(false);
    setToken(null);
    // clearInterval();
    axios.defaults.headers.post['x-auth-token'] = null;

  }
  const loadEntities = () => {
    var url = baseUrl + '/api/entity';
    return axios.get(url)
      .then((response) => {
        console.log(response);
        if (response.status === 400) {
          alert("Incorrect username and password");
        }
        setEntities(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });


  }

  const loadMe = () => {
    var url = baseUrl + '/api/me';
    return axios.get(url)
      .then((response) => {
        console.log(response);
        if (response.status === 400) {
          alert("Incorrect username and password");
        }
        setUser(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });


  }

  const autoRefresh = () => {
    setInterval(() => {
      loadMe()
      loadEntities()
    }, 1000);
  }


  const login = async (e) => {
    // e.preventDefault();
    console.log(email);
    console.log(password);
    var url = baseUrl + '/auth/login';

    axios.post(url, {
      'email': email,
      'password': password
    })
      .then(async (response) => {
        console.log(response);
        if (response.status === 400) {
          alert("Incorrect username and password");
        }
        axios.defaults.headers.get['x-auth-token'] = response.data;
        axios.defaults.headers.post['x-auth-token'] = response.data;
        console.log("loadme");
        var data = await loadMe();
        console.log(data);
        console.log("loadme");
        autoRefresh();
        setToken(response.data);
        setstate(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });


  }

  return (
    <UserContext.Provider value={{
      state: state,
      token: token,
      data: user,
      baseurl: baseUrl,
      entities: entities,
      logout: () => logout()
    }}>
      {!state ?
        <div className="show-fake-browser login-page">
          <Container>
            <Header>
              <Navbar appearance="inverse">
                <Navbar.Header>
                  <a className="navbar-brand logo"></a>
                </Navbar.Header>
              </Navbar>
            </Header>
            <Content>
              <FlexboxGrid justify="center" className="mt-10">
                <FlexboxGrid.Item colspan={12}>
                  <Panel header={<h3>Login</h3>} bordered>
                    <Form fluid onSubmit={(e) => login(e)}>
                      <FormGroup>
                        <ControlLabel>Username or email address</ControlLabel>
                        <FormControl name="email" type="email" onChange={(value) => setEmail(value)} />
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl name="password" type="password" onChange={(value) => setPassword(value)} />
                      </FormGroup>
                      <FormGroup>
                        <ButtonToolbar>
                          <Button appearance="primary" type="submit">Sign in</Button>
                          <Button appearance="link">Forgot password?</Button>
                        </ButtonToolbar>
                        <br />
                        <Register />
                      </FormGroup>
                    </Form>
                  </Panel>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Content>
            <Footer></Footer>
          </Container>
        </div>
        :
        <HomePage />
      }
    </UserContext.Provider>
  );
}

export default LoginPage;
