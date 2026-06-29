const PRECIO_MARLBORO = 6.40;

const campoPrecio = document.getElementById('campoPrecio');
const botonCalcular = document.getElementById('botonCalcular');
const labelResultado = document.getElementById('labelResultado');
const canvas = document.getElementById('panelVisual');
const ctx = canvas.getContext('2d');

// Cargamos la misma imagen que usaste en Java
const imgPack = new Image();
imgPack.src = 'malbro.png';

imgPack.onload = () => {
    // Limpia el lienzo inicialmente al cargar la imagen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

botonCalcular.addEventListener('click', calcularMarlboros);

// Permite calcular al pulsar "Intro" en el teclado del móvil
campoPrecio.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calcularMarlboros();
});

function calcularMarlboros() {
    let input = campoPrecio.value.replace(',', '.');
    let precioEuros = parseFloat(input);

    if (isNaN(precioEuros) || precioEuros < 0) {
        labelResultado.innerText = "¡Introduce un número válido!";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    let totalMarlboros = precioEuros / PRECIO_MARLBORO;
    
    // Mostramos el texto con dos decimales
    labelResultado.innerText = `Equivale a: ${totalMarlboros.toFixed(2).replace('.', ',')} paquetes`;

    dibujarPaquetes(totalMarlboros);
}

function dibujarPaquetes(cantidadTotal) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let anchoPaqueteFull = 60;
    let altoPaqueteFull = 90;
    let margenX = 15;
    let margenY = 15;
    let gap = 15;

    let x = margenX;
    let y = margenY;

    let paquetesCompletos = Math.floor(cantidadTotal);
    let parteDecimal = cantidadTotal - paquetesCompletos;

    // 1. Dibujar los paquetes enteros
    for (let i = 0; i < paquetesCompletos; i++) {
        ctx.drawImage(imgPack, x, y, anchoPaqueteFull, altoPaqueteFull);
        
        x += anchoPaqueteFull + gap;
        // Si el siguiente paquete se sale del ancho del lienzo, salta de línea
        if (x + anchoPaqueteFull > canvas.width - margenX) {
            x = margenX;
            y += altoPaqueteFull + gap;
        }
    }

    // 2. Dibujar el paquete proporcional (recortado) sin bordes extra
    if (parteDecimal > 0.01) {
        let anchoProporcionalDest = anchoPaqueteFull * parteDecimal;
        let srcWidth = imgPack.width * parteDecimal;

        // drawImage(imagen, srcX, srcY, srcW, srcH, destX, destY, destW, destH)
        ctx.drawImage(
            imgPack,
            0, 0, srcWidth, imgPack.height,        // Recorte del archivo original
            x, y, anchoProporcionalDest, altoPaqueteFull // Renderizado en la pantalla
        );
    }
}