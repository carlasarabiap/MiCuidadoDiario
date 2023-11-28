import express from 'express';
import { 
    otherController,
    createCheckList,
    getCheckList,
    getCheckListByUsername,
    updateCheckList,
    deleteCheckList
} from '../controllers/checkListController.js';

const checkRouter = express.Router();

checkRouter.get('/', getCheckList);
checkRouter.get('/:username', getCheckListByUsername);
checkRouter.get("/other", otherController);
checkRouter.post('/', createCheckList);
checkRouter.put("/:username", updateCheckList);
checkRouter.delete("/:username", deleteCheckList);


export default checkRouter;




