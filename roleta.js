const prizes = [
    "Vale-Chocolate", // Prêmio máximo (1% de chance)
    "Chaveiro Mágico",
    "Caneta Estelar",
    "Caderno Cósmico",
    "Adesivo Brilhante",
    "Porta-Copos Lunar",
    "Mini Lanterna",
    "Caneca Galáctica",
    "Pulseira Estrelada",
    "Tente Novamente",
    "Moeda da Sorte"
];
const weights = [1, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11]; // 1% para Vale-Chocolate
let isSpinning = false;
let currentAngle = 0;
let targetAngle = 0;

function weightedRandom() {
    let totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    let weightSum = 0;
    for (let i = 0; i < weights.length; i++) {
        weightSum += weights[i];
        if (random <= weightSum) {
            return i;
        }
    }
    return weights.length - 1;
}

function playOnClick() {
    if (!isSpinning) {
        isSpinning = true;
        document.getElementById('btnPlay').style.display = 'none';
        document.getElementById('btnStop').style.display = 'flex';
        let selectedPrize = weightedRandom();
        targetAngle = currentAngle + (selectedPrize * (360 / 11)) + 720 + Math.random() * 720;
        
        const roleta = document.getElementById('roleta');
        roleta.style.transition = 'transform 8s cubic-bezier(0.1, 0.7, 0.2, 1)';
        roleta.style.transform = `rotate(${targetAngle}deg)`;
        
        setTimeout(() => {
            stopSpin();
        }, 8000);
    }
}

function stopOnClick() {
    if (isSpinning) {
        stopSpin();
    }
}

function stopSpin() {
    isSpinning = false;
    document.getElementById('btnPlay').style.display = 'flex';
    document.getElementById('btnStop').style.display = 'none';
    const roleta = document.getElementById('roleta');
    currentAngle = targetAngle % 360;
    roleta.style.transition = 'none';
    roleta.style.transform = `rotate(${currentAngle}deg)`;
    
    let prizeIndex = Math.floor((360 - (currentAngle % 360)) / (360 / 11)) % 11;
    document.getElementById('msgGanhador').textContent = `Você ganhou: ${prizes[prizeIndex]}!`;
}
