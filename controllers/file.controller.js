
exports.uploadFile = async (req,res,next) => {
    try {
        res.json(req.file);
        
    } catch (error) {
        next(error);
    }
}