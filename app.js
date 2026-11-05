const PRECIO_MARLBORO = 6.40;
const CIGARROS_POR_PAQUETE = 20;
const PRECIO_CIGARRO = PRECIO_MARLBORO / CIGARROS_POR_PAQUETE; 

const campoPrecio = document.getElementById('campoPrecio');
const botonCalcular = document.getElementById('botonCalcular');
const labelResultado = document.getElementById('labelResultado');
const canvas = document.getElementById('panelVisual');
const ctx = canvas.getContext('2d');


const imgPack = new Image();
imgPack.src = 'malbro.png';

const imgCigarro = new Image();
imgCigarro.src = 'segarrillo.png';

imgPack.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

botonCalcular.addEventListener('click', calcularMarlboros);

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

    
    let paquetesEnteros = Math.floor(precioEuros / PRECIO_MARLBORO);
    
    
    let dineroRestante = Math.round((precioEuros - (paquetesEnteros * PRECIO_MARLBORO)) * 100) / 100;
    let totalCigarros = dineroRestante / PRECIO_CIGARRO;

    
    let cigarrosTexto = Number.isInteger(totalCigarros) 
        ? totalCigarros 
        : totalCigarros.toFixed(1).replace('.', ',');

    
    let txtPaquetes = `${paquetesEnteros} ${paquetesEnteros === 1 ? 'paquete' : 'paquetes'}`;
    let txtCigarros = totalCigarros > 0.01 ? ` y ${cigarrosTexto} cigarros` : '';

    labelResultado.innerText = `Equivale a: ${txtPaquetes}${txtCigarros}`;

    dibujarElementos(paquetesEnteros, totalCigarros);
}

function dibujarElementos(paquetes, cigarros) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

   
    let anchoPack = 60;
    let altoPack = 90;

   
    let anchoCig = 10;
    let altoCig = 90;

    let margenX = 15;
    let margenY = 15;
    let gapPack = 15;
    let gapCig = 8; 

    let x = margenX;
    let y = margenY;

  
    for (let i = 0; i < paquetes; i++) {
        if (x + anchoPack > canvas.width - margenX) {
            x = margenX;
            y += altoPack + gapPack;
        }
        ctx.drawImage(imgPack, x, y, anchoPack, altoPack);
        x += anchoPack + gapPack;
    }

  
    let cigarrosEnteros = Math.floor(cigarros);
    let decimalCigarro = cigarros - cigarrosEnteros;

    for (let i = 0; i < cigarrosEnteros; i++) {
        if (x + anchoCig > canvas.width - margenX) {
            x = margenX;
            y += altoCig + gapPack;
        }
        ctx.drawImage(imgCigarro, x, y, anchoCig, altoCig);
        x += anchoCig + gapCig;
    }

  
    if (decimalCigarro > 0.05) {
        if (x + (anchoCig * decimalCigarro) > canvas.width - margenX) {
            x = margenX;
            y += altoCig + gapPack;
        }

        
        let anchoProporcionalDest = anchoCig * decimalCigarro;
        let srcWidth = imgCigarro.width * decimalCigarro;

        ctx.drawImage(
            imgCigarro,
            0, 0, srcWidth, imgCigarro.height,
            x, y, anchoProporcionalDest, altoCig
        );
    }
}