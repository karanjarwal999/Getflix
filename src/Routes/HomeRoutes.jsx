import { Route, Routes } from "react-router-dom";
import Mylist from "../Component/otherComponent/Mylist";
import Search from "../Component/otherComponent/Search";
import NewPopular from "../Component/otherComponent/NewPopular";
import HomePage from "../Component/otherComponent/HomePage";
import MoviesPage from "../Component/otherComponent/MoviesPage";
import ByLanguagePage from "../Component/otherComponent/ByLanguagePage";
import TransferProfile from "../Component/pages/accounts/transferProfile";

export default function HomeRoutes() {
    return (
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/movies' element={<MoviesPage/>}/>
          <Route path='/newAndPopular' element={<NewPopular/>}/>
          <Route path='/MyList' element={<Mylist/>}/>
          <Route path='/ByLanguage' element={<ByLanguagePage/>}/>
      </Routes>
    )
  }
  