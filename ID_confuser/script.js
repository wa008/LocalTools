document.getElementById('textInput').addEventListener('input', generateImage);
document.getElementById('gridSize').addEventListener('input', function() {
    document.getElementById('gridValue').textContent = this.value;
    generateImage();
});

generateImage();

function generateImage() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const inputText = document.getElementById('textInput').value;
    const textArr = inputText.split('');
    const N = parseInt(document.getElementById('gridSize').value);
    const blockSize = canvas.width / N;
    let textIndex = 0;

    const colors = ['#FF5733', '#33C1FF'];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            const x = col * blockSize;
            const y = row * blockSize;
            const isRed = (row + col) % 2 === 0;
            ctx.fillStyle = isRed ? colors[0] : colors[1];
            ctx.fillRect(x, y, blockSize, blockSize);

            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            if (isRed && textIndex < textArr.length) {
                ctx.fillText(textArr[textIndex], x + blockSize / 2, y + blockSize / 2);
                textIndex++;
            } else if (!isRed) {
                const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                ctx.fillText(randomChar, x + blockSize / 2, y + blockSize / 2);
            }
        }
    }

    const downloadLink = document.getElementById('download');
    downloadLink.href = canvas.toDataURL();
}