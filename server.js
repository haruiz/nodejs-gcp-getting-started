const express = require("express");
const app = express();
const path = require("path");
const multer = require('multer');
const upload = multer();
const fs = require("fs");
const util = require("util");
//const writeFileAsync = util.promisify(fs.writeFile);
const vision = require('@google-cloud/vision');


//process.env["GOOGLE_APPLICATION_CREDENTIALS"] = "<PATH TO YOUR AUTH FILE>";


// gcloud auth application-default login
const callGoogleVisionAPI = async(image)=>{	
	const client = new vision.ImageAnnotatorClient();	
	const request = {image: {content: image }};
	const results = await client.faceDetection(request);
	const faces = results[0].faceAnnotations;
	const numFaces = faces.length;
	console.log(`Found ${numFaces} face${numFaces === 1 ? '' : 's'}.`);
	return faces;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, 'public')))


app.post("/uploadImage", upload.none(), async(req, res)=>{	
	try{
		const imageBase64 = req.body["image"].replace(/^data:image\/jpeg;base64,/, "");
		let imageBuffer = Buffer.from(imageBase64, 'base64');	
		//await writeFileAsync("out.jpeg", imageBuffer, 'base64');	
		const faces = await callGoogleVisionAPI(imageBuffer);	
		return res.json({faces});
	}
	catch(ex){
		throw new Error(e)
	}
});

app.post("/receiveJSON", (req, res)=>{	
	const data = req.body;		
	return res.json({
		data: "ok"
	});
});


app.get("/", (req, res)=>{
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
	console.log(`Server listening on port ${PORT}...`);
});
