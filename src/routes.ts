import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController();

// router.use(ensureAdmin)
router.post("/tags", 
  ensureAthenticated, 
  ensureAdmin, 
  createTagController.handle
);

router.get("/tags", 
  ensureAthenticated,
  listTagsController.handle
);

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAthenticated, createComplimentController.handle);

router.get("/users/compliments/send", 
  ensureAthenticated,
  listUserSendComplimentsController.handle
);

router.get("/users/compliments/receive", 
  ensureAthenticated,
  listUserReceiveComplimentsController.handle
);

router.get("/users",
  ensureAthenticated,
  listUsersController.handle
);




export { router };