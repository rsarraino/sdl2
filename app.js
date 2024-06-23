// Configuração da API do Google Sheets
const SPREADSHEET_ID = 'seu_id_da_planilha';
const API_KEY = 'sua_chave_api';

// Função para inicializar o escaner de QR code
function initQRScanner() {
    const video = document.getElementById('qr-video');
    const resultDiv = document.getElementById('result');

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
            video.srcObject = stream;
            video.setAttribute('playsinline', true);
            video.play();
            requestAnimationFrame(tick);
        });

    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                console.log("QR Code detectado", code.data);
                resultDiv.textContent = `ISBN: ${code.data}`;
                sendToGoogleSheets(code.data);
            }
        }
        requestAnimationFrame(tick);
    }
}

// Função para enviar dados para o Google Sheets
function sendToGoogleSheets(isbn) {
    // Implemente a lógica para enviar o ISBN para o Google Sheets usando a API
    // Você precisará configurar a autenticação e usar a API do Google Sheets
}

// Função para carregar a lista de livros do Google Sheets
function loadBookList() {
    const bookList = document.getElementById('book-list');
    
    // Implemente a lógica para carregar os dados do Google Sheets
    // e preencher a lista de livros
}

// Inicialização
if (document.getElementById('qr-video')) {
    initQRScanner();
} else if (document.getElementById('book-list')) {
    loadBookList();
}
