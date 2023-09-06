import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchLogMe } from "./features/auth.slice";

function App() {
  const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchLogMe())
  }, [dispatch])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<FullPost />} />
          <Route path="/addNews" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>

      </Container>
    </>
  );
}

export default App;
