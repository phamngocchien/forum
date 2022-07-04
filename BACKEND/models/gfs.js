var FileSchema = new Schema({}, { strict: false });
var File = mongoose.model('GFS', FileSchema, 'fs.files');
export default File;