import React, { Component } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function ImageZoomComponent({ image }) {
    return (
        <TransformWrapper initialScale={1}
            initialPositionX={0}
            initialPositionY={0}>
            <TransformComponent>
                <img src={image} alt="test" />
            </TransformComponent>
        </TransformWrapper>
    );

}

export default ImageZoomComponent
