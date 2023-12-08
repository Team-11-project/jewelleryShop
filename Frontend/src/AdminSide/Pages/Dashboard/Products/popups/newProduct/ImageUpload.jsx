import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './imageUpload.css'

function ImageUpload({ getImage }) {
    const [image, setImage] = useState([])
    // setImageData(image[0])
    getImage(image)
    // console.log(image)

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        acceptedFiles: 'image/jpeg',
        onDrop: (acceptedFiles) => {
            setImage(
                acceptedFiles.map((upFile) => Object.assign(upFile, {
                    preview: URL.createObjectURL(upFile)
                }))
            );
            getImage(
                acceptedFiles.map((upFile) => Object.assign(upFile, {
                    preview: URL.createObjectURL(upFile)
                }))
            )

        }

    })

    return (
        <>
            <div className="image-cont">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ? <p> drop your image here..</p> : <p>drop your image here or click to upload</p>
                    }
                </div>
                <div>
                    {image.map((upFile) => {
                        return (
                            <img src={upFile.preview} alt="preview" className='image-preview' />
                        )
                    })}
                </div>
            </div>

        </>
    )

}
export default ImageUpload