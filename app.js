// teste
// app.js
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Google API client
    let script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => handleClientLoad();
    document.body.appendChild(script);

    if (document.getElementById("reader")) {
        const html5QrCode = new Html5Qrcode("reader");

        html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 10, // Scans per second
                qrbox: { width: 250, height: 250 }
            },
            qrCodeMessage => {
                // Extract ISBN from QR code message
                document.getElementById("isbn").innerText = `ISBN: ${qrCodeMessage}`;;
                appendBookData(qrCodeMessage); // Add to Google Sheets
            },
            errorMessage => {
                // Error handling
                console.warn(errorMessage);
            })
        .catch(err => {
            console.error(err);
        });

        document.getElementById('stop-scanning').addEventListener('click', () => {
            html5QrCode.stop().then(ignore => {
                console.log("Scanning stopped.");
            }).catch(err => console.error("Failed to stop scanning.", err));
        });
    }

    if (document.getElementById("book-list")) {
        listBooks(); // Load book list on list.html
    }
});
