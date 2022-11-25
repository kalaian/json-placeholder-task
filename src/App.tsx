import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppNavBar from "./pages/AppBar/AppNavBar";
import Users from "./pages/Users/Users";
import EditUser from "./pages/EditUser/EditUser";
import Posts from "./pages/Posts/Posts";
import EditPost from "./pages/EditPost/EditPost";

const App = () => {
  return (
    <BrowserRouter>
      <AppNavBar />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/edit-user/:userId" element={<EditUser />} />
        <Route path="/posts/:userId" element={<Posts />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
