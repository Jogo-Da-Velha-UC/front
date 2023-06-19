import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Index';
import Game from './pages/Game/Index'

export default function ExactRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' Component={Home} />
                <Route path='/game' Component={Game} />
            </Routes>
        </Router>
    );
}