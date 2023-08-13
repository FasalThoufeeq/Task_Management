import {} from "react";
import { Routes, Route } from "react-router-dom";
import { UserHome } from "../Pages/User/UserHome";
import EditTasks from "../Pages/User/EditTasks";
import PostTasks from "../Pages/User/PostTasks";

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/edit_task/:taskId" element={<EditTasks/>}/>
        <Route path="/post_task" element={<PostTasks/>}/>
      </Routes>
    </>
  );
};

export default UserRoutes;
