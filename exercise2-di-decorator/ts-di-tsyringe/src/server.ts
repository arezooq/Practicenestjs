// without dependency injection

// import PostController from './controllers/postController'
// import GetAllController from './controllers/getAllController'
// import GetOneController from './controllers/getOneController'
// import updateController from './controllers/updateController'
// import deleteController from './controllers/deleteController'

// const app = new App([new PostController(), new GetAllController(), new GetOneController(), new updateController(), new deleteController() ], Number(process.env.PORT))

// with dependency injection tsyringe

import 'reflect-metadata'
import App from './app'
import { container } from 'tsyringe';


const app = container.resolve(App)


app.listen()
