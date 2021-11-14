import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { LastLocationProvider } from "react-router-last-location";

import Routes from "./Routes";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
			<LastLocationProvider>
        <Routes />
      </LastLocationProvider>
    </Router>
  );
} 

export default App;
