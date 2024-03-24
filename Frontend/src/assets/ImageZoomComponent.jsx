import React, { Component } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
function ImageZoomComponent({ image }) {

    return (
        <TransformWrapper initialScale={1}
            initialPositionX={0}
            initialPositionY={0}>
            <TransformComponent>
                <img className="img-fluid rounded" src={image} alt="" />
            </TransformComponent>
        </TransformWrapper>
    );

}

export default ImageZoomComponent
