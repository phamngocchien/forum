import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import posts from "./routers/posts.js";
import replies from "./routers/replies.js";
import tags from "./routers/tags.js";
import users from "./routers/users.js";
import document from "./routers/document-type.js";
import notification from "./routers/notification.js";
import messenger from "./routers/messenger.js";

import path from "path";
import multiparty from "connect-multiparty";
import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import dotenv from "dotenv";
import { searchAll } from "./controllers/search.js";
import Grid from 'gridfs-stream'
import crypto from "crypto";
import DocumentTypeModel from "./models/document-type.js";
import http from "http"
import { Server } from "socket.io";
import { controllerNotification } from "./controllers/notification.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const URI = process.env.DATABASE_URL

app.use(cors());

const __dirname = path.resolve();
const MuiltiPartyMiddleware = multiparty({ uploadDir: "./images" });
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use("/api", posts)
app.use("/api", tags)
app.use("/api", users)
app.use("/api", replies)
app.use("/api", document)
app.use("/api", notification)
app.use("/api", messenger)



app.use("/search", searchAll)

app.use(express.static("./uploads"));
app.post('/upload', MuiltiPartyMiddleware, (req, res) => {
  var TempFile = req.files.upload;
  var TempPathfile = TempFile.path;
  const targetPathUrl = path.join(__dirname, "./uploads/" + TempFile.name);
  if (path.extname(TempFile.originalFilename).toLowerCase() === ".jpg" || ".png") {
    fs.rename(TempPathfile, targetPathUrl, err => {
      res.status(200).json({
        uploaded: true,
        url: `http://localhost:5000/${TempFile.originalFilename}`
      });
      if (err) return console.log(err);
    })
  }
})


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    transports: ['websocket'],
    allowUpgrades: false
  },
});

io.on("connection", (socket) => {
  controllerNotification(socket, io);
})

const conn = mongoose.createConnection(URI);
let gridFSBucket;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'fs'
  });

});
const storage = new GridFsStorage({
  url: URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'fs',
        };
        resolve(fileInfo);
        const a = async () => {
          const DocTypeDetail = await DocumentTypeModel.findById(req.params.idCategory)
          console.log(DocTypeDetail)
          DocTypeDetail.files.push(file.originalname);
          DocTypeDetail.save()
        }
        a();
      });
    });
  }
});
const upload = multer({ storage });

app.post('/files/upload/:idCategory', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
    return res.json(files);
  });
});

app.get('/files/quantity', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    return res.json(files.length);
  });
});

app.get('/filebydoc/:idDoctype', async (req, res) => {
  const a = []
  await DocumentTypeModel.findById(req.params.idDoctype).then(data =>
    data.files.forEach((item) => {
      gfs.files.find().toArray((err, files) => {
        files.forEach(item2 => {
          if (String(item2.filename) === String(item)) {
            a.push(item2)
          }
        })
      })
    })
  )
  setTimeout(() => {
    res.status(200).json(a);
  }, 500);
});

app.get('/files/:filename', (req, res) => {
  gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        message: "Could not find file"
      });
    }
    const readStream = gridFSBucket.openDownloadStream(files[0]._id);
    readStream.pipe(res);

  });
});

app.delete('/files/:id', async (req, res) => {
  try {
    const obj_id = new mongoose.Types.ObjectId(req.params.id);
    gridFSBucket.delete(obj_id);
    res.json("successfully deleted image!");
  } catch (err) {
    console.error(err.message);
  }
})

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connect to DB");
    server.listen(PORT, () => {
      console.log(`Server is runing on port ${PORT}`)
    })
  })
  .catch(err => {
    console.log("err" + err)
  })

