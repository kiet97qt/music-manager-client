import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography} from '@material-ui/core';
import Home from './components/song/Home';


function App() {

  return (
    <BrowserRouter>
      <AppBar position="static" className="navbar navbar-light bg-light">
        <Toolbar>
          <Typography variant="h6" className='navbar-brand'>
            Music Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="container mt-3">
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</div>
    </BrowserRouter>

  );
}

export default App;
