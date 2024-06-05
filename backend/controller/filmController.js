import filmModel from "../models/film.js";
const filmController = {
    //Tạo phim
    createFilm: async (req, res) => {
        const {id, name, time, year, image, introduce} = req.body;
        // Kiểm tra xem phim đã tồn tại chưa
        try {
            const testFilm = await filmModel.findOne({name});
            if (testFilm) {
                return res.status(409).send("Phim đã tồn tại");
            }
        } catch (err) {
            return res.status(500).send("Lỗi kiểm tra phim tồn tại");
        }
        try {
            const newFilm = new filmModel({
                id,
                name,
                time,
                year,
                image,
                introduce
            });
            await newFilm.save();
            return res.status(200).send({
                message: "Tạo phim thành công",
                newFilm: newFilm
            });
        } catch (err) {
            res.status(500).send("Lỗi khi thêm phim");
        }
    },
    getAllFilm: async (req, res) => {
        try {
            const listFilm = await filmModel.find();
            res.status(200).send({
                message: "Thành công",
                data: listFilm
            })
        } catch (err) {
            res.status(400).send(err)
        }
    },
    //Cập nhật phim
    updateFilm: async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const existingFilm = await filmModel.findById(id);

            if (existingFilm) {
                const updatedFilm = await filmModel.findByIdAndUpdate(id, data, { new: true });
                res.status(200).send({
                    data: updatedFilm,
                    message: "Cập nhật thành công"
                });
            } else {
                console.error(`Phim với ID ${id} không được tìm thấy`);
                res.status(404).send({
                    message: "Không tìm thấy phim với ID cung cấp"
                });
            }
        } catch (err) {
            console.error('Error updating film:', err);
            res.status(500).send({ message: 'Internal Server Error', error: err });
        }
    },
    //Xóa phim
    delete: async (req, res)=>{
        try{
            const {id} = req.params;
            await filmModel.findByIdAndDelete(id)
            res.status(201).send("Xóa thành công")
        }catch (err){
            res.status(401).send(err)
        }
    },
    //Tìm kiếm phim theo tên phim
    searchFilm: async (req, res)=>{
        const { key } = req.body;
        if (!key) {
            return res.status(401).send("Bạn hãy nhập từ khóa tìm kiếm!");
        }
        try {
            const films = await filmModel.find({ name: { $regex: key, $options: 'i' } });
            res.status(201).send(films);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    //Sắp xếp phim theo năm
    sortFilmByYear: async (req, res)=>{
        const {sort} = req.query;
        if(!sort || (sort !=='asc' && sort !=='desc')){
            return res.status(401).send("Bạn cung cấp thứ tự sắp xếp")
        }
        try{
            const films = await filmModel.find().sort({year: sort === 'asc' ? 1 : -1})
            res.status(201).send(films)
        }catch (err){
            res.status(401).send("Lỗi khi sắp xếp phim")
        }
    }

}

export default filmController;
