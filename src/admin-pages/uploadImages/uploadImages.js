import React, { useEffect, useState } from "react";
import "../uploadImages/uploadImages.css"
import {imgDB, textDB} from "../../database/firebase";
import { v4 } from "uuid"
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { Button, Container } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import { Slider } from "@mui/material";

function UploadImages() {
    const [imageTitle, setImageTitle] = useState('');
    const [imageDescription, setImageDescription] = useState('');
    const [imageCatagory, setCatagory] = useState('');
    const [imagePrice, setImagePrice] = useState('');
    const [pricing,setpricing] = useState('');
    const [uploadingStart, setUploadingStart] = useState(Boolean)
    const [imageDiscount, setimageDiscount] = useState('')
    const [discountPrice, setdiscountPrice] = useState('')

    const hadleupload = (e) =>{
        const imgs = ref(imgDB, `publishImages/${(v4())}`)
        setUploadingStart(true)
        uploadBytes(imgs,e.target.files[0]).then(data => {
            // console.log(data,"images")
            getDownloadURL(data.ref).then(val => {
                setimageURL(val)
                toast.success('Image is updated')
                setUploadingStart(false)
            })
        })
    }

    const countDiscount = () =>{
        var totalValue = imagePrice * ( (100-imageDiscount) / 100 )
        setdiscountPrice(totalValue.toFixed(2))
    }

    useEffect(() => {
        const storage = getStorage();
        const listRef1 = ref(storage, 'siteLogo/noimage.png');
        const image1 = getDownloadURL(listRef1)
        image1.then(siteLogo => setnoImageURL(siteLogo))
        countDiscount()
    })
    const [noImageURL, setnoImageURL] = useState('');
    const [imageURL, setimageURL] = useState('');
    const hadlesubmit = (e) => {

        const valRef = collection(textDB, 'publishImages/')
        const data = {
            "id" : v4(),
            "catagory" : imageCatagory,
            "title" : imageTitle,
            "description" : imageDescription,
            "img" : imageURL,
            "uploaded_date": new Date(),
            "price" : imagePrice,
            "discount":imageDiscount,
            "discountPrice" : discountPrice
        }
        addDoc(valRef,data).then(res => toast.success("Image added successfully"))
    }
    return(
        <Container fluid>
        <div className="uploadBox">
            <Toaster />
            <div className="uploadDetails">
                <h3>Upload Images Here</h3>
                <div className="imageuploader">
                    <input className="uploader" type="file"  onChange={(e)=>hadleupload(e)} />
                    <img src={imageURL ? imageURL : noImageURL} className="uploaded-image" />
                </div>
                <div className="form">
                    <input type="text" placeholder="Image Title" onChange={(e)=> setImageTitle(e.target.value)} />
                    <textarea  placeholder="Image Description" onChange={(e)=> setImageDescription(e.target.value)} />
                    <select onChange={(e)=> setCatagory(e.target.value)}>
                        <option>Select Catagory</option>
    <option>Stokes</option>
    <option>Vectors</option>
    <option>Icons</option>
    <option>PSD</option>
    <option>Mockups</option>
    <option>Videos</option>             </select>
                    <select onChange={(e)=> setpricing(e.target.value)}>
                        <option>Select Pricing</option>
                       <option>Free</option>
                       <option>Paid</option>
                    </select>
                   
                    <input type="number" disabled={pricing == 'Free'} placeholder="Image Price in Rupess" onChange={(e)=> setImagePrice(pricing == 'Free' ? '' : e.target.value)} />
                    <div>
                        <h4>Select Discount</h4>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={0}
                            valueLabelDisplay="auto"
                            shiftStep={5}
                            step={5}
                            marks
                            min={0}
                            max={80}
                            onChange={(e) => setimageDiscount(e.target.value)}
                            disabled={pricing == 'Free'}
                        />
                    </div>
                    <input type="text" placeholder="Discount Price" value={discountPrice} />
                    <div className="button-section">
                        <Button variant="success" onClick={(e) => hadlesubmit(e)} disabled={uploadingStart == true}>{uploadingStart == true ? "Please wait image is uploading" : "Upload Now"}</Button>
                        <Button variant="info">Reset</Button>
                    </div>
                </div>
            </div>
        </div>
        </Container>
    )
}

export default UploadImages;
