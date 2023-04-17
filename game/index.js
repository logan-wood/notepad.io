const canvas  = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './gameAssets/OutsideMap.png';

const playerImage = new Image();
playerImage.src = './gameAssets/AfroMan.png';

image.onload = () => {
    c.drawImage(image, -1550, -1000);
    c.scale(3,3)
    c.drawImage(playerImage, 120, 120);


}