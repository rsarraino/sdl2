// gapi.js (Google API integration)
const SPREADSHEET_ID = 'your-spreadsheet-id';
const CLIENT_ID = 'your-client-id';
const API_KEY = 'your-api-key';
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(() => {
        gapi.auth2.getAuthInstance().signIn();
    }, function(error) {
        console.error(JSON.stringify(error, null, 2));
    });
}

function appendBookData(isbn) {
    const params = {
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A:A',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
    };

    const valueRangeBody = {
        "majorDimension": "ROWS",
        "values": [
            [isbn]
        ],
    };

    let request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then((response) => {
        console.log(response.result);
    }, (reason) => {
        console.error('error: ' + reason.result.error.message);
    });
}

function listBooks() {
    const params = {
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A:A',
    };

    gapi.client.sheets.spreadsheets.values.get(params).then((response) => {
        const range = response.result;
        if (range.values.length > 0) {
            const bookList = document.getElementById("book-list");
            range.values.forEach((row) => {
                let li = document.createElement('li');
                li.innerText = row[0];
                bookList.appendChild(li);
            });
        }
    }, (reason) => {
        console.error('error: ' + reason.result.error.message);
    });
}
