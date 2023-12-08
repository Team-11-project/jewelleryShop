import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './imageUpload.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

function ImageUpload({ getImage }) {
    const [image, setImage] = useState([])
    getImage(image)

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
                <div {...getRootProps()} className='image-body'>
                    <input {...getInputProps()} />

                    {image ? <></> : <FontAwesomeIcon icon={faImage} />}
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