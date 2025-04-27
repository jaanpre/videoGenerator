const express = require('express');
const { exec } = require('child_process');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Route to generate the video
app.post('/generate-video', async (req, res) => {
    const { title, images, music } = req.body;

    // Aquí iría la lógica para manejar la generación del video
    // Descarga las imágenes, música y usa FFmpeg para crear el video
    try {
        // Descarga las imágenes (simulada)
        for (let i = 0; i < images.length; i++) {
            const imageUrl = images[i];
            const imagePath = path.join(__dirname, `image${i}.jpg`);
            const response = await fetch(imageUrl);
            const buffer = await response.buffer();
            fs.writeFileSync(imagePath, buffer);
        }

        // Descarga la música (simulada)
        const musicUrl = music;
        const musicPath = path.join(__dirname, 'background-music.mp3');
        const musicResponse = await fetch(musicUrl);
        const musicBuffer = await musicResponse.buffer();
        fs.writeFileSync(musicPath, musicBuffer);

        // Crear el video con FFmpeg (simulado)
        const outputVideoPath = path.join(__dirname, 'output-video.mp4');
        const ffmpegCommand = `ffmpeg -loop 1 -framerate 2 -t 10 -i image0.jpg -i background-music.mp3 -c:v libx264 -c:a aac -strict experimental ${outputVideoPath}`;
        
        exec(ffmpegCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).send({ message: 'Error generating video' });
            }

            // Respond with the video URL (simulada)
            res.send({
                message: 'Video generated successfully!',
                videoUrl: `https://tu-servidor.onrender.com/output-video.mp4`
            });
        });

    } catch (error) {
        console.error('Error during video generation:', error);
        res.status(500).send({ message: 'Error processing the video request' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
