import Layout from "./components/Layout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Search from "./pages/Search";
import Storage from "./pages/Storage";
import 'fontsource-roboto';

function App() {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/search"/>
                        </Route>
                        <Route path="/search">
                            <Search/>
                        </Route>
                        <Route path="/storage">
                            <Storage/>
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
