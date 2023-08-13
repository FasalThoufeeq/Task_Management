import express from "express";
import taskController from "../Controllers/taskController.js";
import upload from '../Config/multer.js'



const userRoutes=()=>{
    const router = express.Router();
    const controller=taskController()

    router.post('/post_task',upload.single("taskPicture"),controller.postTask)

    router.put('/edit_task/:taskId',upload.single("taskPicture"),controller.editTask)

    router.delete('/delete_task/:taskId',controller.deleteTask)

    router.get('/get_task/:taskId',controller.getTask)

    router.get('/get_all_tasks',controller.getAllTask)


    return router;
}

export default userRoutes;