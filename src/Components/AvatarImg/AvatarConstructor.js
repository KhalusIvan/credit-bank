import React, { useRef } from 'react';
import ImageLoader from './ImageLoader.js';
const Avatar = (props) => {
    const redactImageElement = useRef(null);
    const previewAvatarElement = useRef(null);
    function handleImage(e) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let img = new Image();
            img.onload = function () {
                const ctx = redactImageElement.current.getContext('2d');
                const ctxAva = previewAvatarElement.current.getContext('2d');
                redactImageElement.current.width = img.width;
                redactImageElement.current.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, redactImageElement.current.width, redactImageElement.current.height);
                ctx.beginPath();
                ctx.lineWidth = 10;
                let radius;
                if (redactImageElement.current.width > redactImageElement.current.height)
                    radius = redactImageElement.current.height / 3;
                else radius = redactImageElement.current.width / 3;
                let circle = {
                    x: redactImageElement.current.width / 2,
                    y: redactImageElement.current.height / 2,
                    radius: radius
                }
                ctx.arc(circle.x, circle.y, circle.radius, 0, (Math.PI / 180) * 360, true);
                previewAvatarElement.current.width = previewAvatarElement.current.height = radius;
                drawAva(circle.x - radius, circle.y - radius);
                ctx.stroke();
                let targetCoords = redactImageElement.current.getBoundingClientRect();
                function isClickedOnCircle(clickX, clickY) {
                    return Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2)) <= circle.radius;
                }
                function drawCircle() {
                    ctx.clearRect(0, 0, redactImageElement.current.width, redactImageElement.current.height);
                    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, redactImageElement.current.width, redactImageElement.current.height);
                    ctx.beginPath();
                    ctx.arc(circle.x, circle.y, circle.radius, 0, (Math.PI / 180) * 360, true);
                    ctx.stroke();
                }
                function drawAva(imageX, imageY) {
                    ctxAva.clearRect(0, 0, previewAvatarElement.current.width, previewAvatarElement.current.height);
                    ctxAva.drawImage(img, imageX, imageY, circle.radius * 2, circle.radius * 2, 0, 0, previewAvatarElement.current.width, previewAvatarElement.current.height);
                }
                redactImageElement.current.onmousedown = function (event) {
                    let clickX = (event.pageX - targetCoords.left) * redactImageElement.current.width / targetCoords.width;
                    let clickY = (event.pageY - targetCoords.top) * redactImageElement.current.height / targetCoords.height;
                    if (!isClickedOnCircle(clickX, clickY)) {
                        return;
                    }
                    let shiftX = clickX - circle.x;
                    let shiftY = clickY - circle.y;
                    moveAt(clickX, clickY);
                    function moveAt(pageX, pageY) {
                        circle.x = pageX - shiftX;
                        circle.y = pageY - shiftY;
                        if (circle.x - circle.radius <= 0)
                            circle.x = radius;
                        else if (circle.x + circle.radius >= redactImageElement.current.width)
                            circle.x = redactImageElement.current.width - radius;
                        if (circle.y - circle.radius <= 0)
                            circle.y = radius;
                        else if (circle.y + circle.radius >= redactImageElement.current.height)
                            circle.y = redactImageElement.current.height - radius;
                        drawCircle();
                        drawAva(circle.x - radius, circle.y - radius);
                    }
                    function onMouseMove(event) {
                        let clickX = (event.pageX - targetCoords.left) * redactImageElement.current.width / targetCoords.width;
                        let clickY = (event.pageY - targetCoords.top) * redactImageElement.current.height / targetCoords.height;
                        moveAt(clickX, clickY);
                    }
                    function stopDrag() {
                        document.removeEventListener('mousemove', onMouseMove);
                        redactImageElement.current.onmouseup = null;
                    }
                    document.addEventListener('mousemove', onMouseMove);
                    redactImageElement.current.onmouseout = redactImageElement.current.onmouseup = function () {
                        stopDrag();
                    }
                };
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    return (
        <>
            <h1>Avatar Constructor</h1>
            <ImageLoader handleImage={handleImage} />
            <br />
            <canvas ref={redactImageElement} />
            <canvas ref={previewAvatarElement} />
        </>
    )
}
export default Avatar;