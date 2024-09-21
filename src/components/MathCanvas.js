import React, { useRef, useState, useEffect } from 'react';

const MathCanvas = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [result, setResult] = useState('');

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = 'black';
        context.lineWidth = 3;
    }, []);

    const startDrawing = (e) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.beginPath();
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    };

    const recognizeText = () => {
        // Here you would integrate with a text recognition API
        setResult('Recognition result will appear here');
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setResult('');
    };

    return (
        <div className="flex flex-col items-center p-4">
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="border border-gray-300"
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onMouseLeave={stopDrawing}
            />
            <div className="mt-4 space-x-2">
                <button onClick={recognizeText} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Recognize
                </button>
                <button onClick={clearCanvas} className="px-4 py-2 bg-gray-500 text-white rounded">
                    Clear
                </button>
            </div>
            <div className="mt-4">
                <p>Result: {result}</p>
            </div>
        </div>
    );
};

export default MathCanvas;