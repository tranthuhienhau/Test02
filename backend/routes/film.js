import {Router} from "express";
import filmController from "../controller/filmController.js";
const routerFilm = Router();
routerFilm.post("/create", filmController.createFilm)
routerFilm.put("/update/:id", filmController.updateFilm)
routerFilm.get("/getAll", filmController.getAllFilm)
routerFilm.delete("/delete/:id", filmController.delete)
routerFilm.post("/search", filmController.searchFilm)
routerFilm.get("/sort", filmController.sortFilmByYear)
routerFilm.post("/handleUpload/:id", filmController.uploadImage)
// routerFilm.post("/upload/:id", filmController.upload)

export default routerFilm;