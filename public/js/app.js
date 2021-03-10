main = ()=>{
    let btnSend = document.getElementById("btnSend");
    let imageInput = document.getElementById("imageInput");
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    
    btnSend.onclick = (evt) =>{
        sendImage()
            .then((resp)=>{
                if(resp.ok && resp.status === 200){
                    return resp.json();
                }                
            })
            .then((data)=>{
                let face = data["faces"][0];
                let boundingBox = face["boundingPoly"]
                let vertices = boundingBox.vertices;
                console.log(vertices);
                ctx.save();
                ctx.fillStyle = '#f00';
                ctx.strokeStyle = "#f00";
                ctx.beginPath();
                let startPt = vertices.pop(0);
                ctx.moveTo(startPt.x, startPt.y);
                vertices.forEach((pt)=>{
                    ctx.lineTo(pt.x,pt.y);
                });
                ctx.closePath();
                //ctx.fill();
                ctx.stroke();
                ctx.restore();
            })
            .catch((err) =>{
                console.log(`error sending image to the server ${err}`)
            })
            
    };

    imageInput.onchange = (evt) =>{
        var allowedExtReg = /(\.jpg|\.jpeg|\.png)$/i; 
        let files = evt.target.files;
        if(files && files.length){
            let myFile = files[0];                    
            let myFileName = myFile.name;
            // check file ext
            if(allowedExtReg.exec(myFileName)){
                let fr = new FileReader() 
                // load file as base64 string encoded
                fr.readAsDataURL(myFile);
                fr.onload =(evt)=>{                    
                    displayImage(evt.target.result);
                }
            }
        }
    };

    const displayImage = (base64Img)=>{               
        const img = new Image();
        img.src = base64Img;
        img.onload = (evt) => {                    
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;                
            var ratio  = Math.min(hRatio, vRatio );
            var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
            var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);                    
        }
    };

    const sendImage = ()=>{
        var fullQualityImage = canvas.toDataURL('image/jpeg', 1.0);
        const formData = new FormData();
        formData.append('image', fullQualityImage);        
        return fetch("/uploadImage",{        
            method: "post",
            body: formData
        })
    };

    const sendJSON = ()=>{        
        return fetch("/uploadImage",{        
            headers: {            
                'Content-Type': 'application/json'
            },
            method: "post",
            body: JSON.stringify({data: 123})
        })
    };
}
main();