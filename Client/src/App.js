import { Routes, Route } from 'react-router-dom';
import Search from './SearchForm/SearchForm';
import Favorites from './Favorites/Favorites';
import NavBar from './NavBar/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      {/* Define routes using the React Router's `Routes` and `Route` components */}
      <Routes>
        {/* Define route for landing page which will be the search */}
        <Route path='/' element={<Search />}></Route>
        {/* Define route for favorites page */}
        <Route path='/favorites' element={<Favorites />}></Route>
      </Routes>
    </div>
  );
}

export default App;
