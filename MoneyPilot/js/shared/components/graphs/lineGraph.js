export function render_chart(data) {
    const canvas = document.getElementById("balance_trend_chart");
    if (!canvas) return;
    const ctx_1 = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx_1.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 30;
    const width = canvas.width - 2 * padding;
    const height = canvas.height - 2 * padding;

    const maxAbs = Math.max(...data.map(v => Math.abs(v))) || 1;
    const max = maxAbs;
    const min = -maxAbs;
    const range = max - min;

    const stepX = width / (data.length - 1);

    const zeroY = padding + height - ((0 - min) / range) * height;

    ctx_1.beginPath();
    ctx_1.strokeStyle = "#e2e8f0";
    ctx_1.lineWidth = 1;
    ctx_1.moveTo(padding, zeroY);
    ctx_1.lineTo(padding + width, zeroY);
    ctx_1.stroke();

    ctx_1.beginPath();
    ctx_1.strokeStyle = "#2563eb";
    ctx_1.lineWidth = 3;
    
    let prev_x = null;
    let prev_y = null;
    
    data.forEach((value, index) => {
        const x = padding + index * stepX;
        const y = padding + height - ((value - min) / range) * height;
    
        if (index === 0) {
            ctx_1.moveTo(x, y);
        } else {
            const cp_x = (prev_x + x) / 2;
            ctx_1.bezierCurveTo(cp_x, prev_y, cp_x, y, x, y);
        }
    
        prev_x = x;
        prev_y = y;
    });
    
    ctx_1.stroke();
}