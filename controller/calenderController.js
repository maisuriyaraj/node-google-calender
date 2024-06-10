const { google } = require('googleapis');

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDMMVZGooo3WgVA\nhA2+9L7amzHc3GUp0W0U4Z+l+1oQ7EaOF51nd84N/fveN9yRvUapyF6fbY5aNok0\nUn4RWDIcy4gyekKya/d+tBlkumerPRUXtl06aCm+hdfsTd4zEWkqTHpBezsvdx/s\nmiLkbfb4qvfZ5/Ir/HeLNv4i63v38BNuW5IIPwRxRvGFKWN12dN2JJLNOvcTWr3S\nMPMHszOpAYEMg75CwB/0HSo6ZJLp/DV29F/KHxs7f5eUqNI8zu22YH3FW7uPQHe9\n/z49nh1d0FFbzCna0LmH2Pz6bmbAiDjOO1vEYBfAQ7IgvOZDx8aISGe/wAlu/vEm\nsTRFQ0//AgMBAAECggEANy/Eah3G7lPRpJCsKGZ8aJfWP6N/YfB8o06hd9o5iuZY\n4VFnlM3P7n8tAe+mGOuHfB6v2DXjaeVgarg641QrYxXtLvtVKGS+xMtHK66nkyPU\nng6HHuCFG72P0IlxGutDOY/m4Oi948O16Jv1/zfrLmUCzK2ACbxX0NPhlq1/WVBY\ntAEUonN5J56j+8RJQK0dWjW886Y8iMacjnGDDsTOdDljUf6Gx2RSXubIIl4ZEhqr\nUrZaENo0/tZrkm37l/hNe5DK9MOo32gkvNLJQN6yjE7HbPGPa1ruPp8KG3h+2xw4\n5H54kcph6xTXEb7Bl+bOYuvTPDQe9R1cPCBOazSdPQKBgQD8p2Fd8iS2WoPrgwVI\nH1Us65V7pvPXhNv8swuW/gsOwj+9fuXPJnlAr2borqVfLYVP1X5aeIO9nQ76xcmf\nWlyFEFtdyKWz7uFLuP2TLtep072kUKWz+BrRbnI2C6GsWGOG4kNFE3qL4Oao6MyI\nfGZro2aWeoHjARupH8YykIkNLQKBgQDO5aZfp5fQX/DPLpZqdGFP+ErmBJecGTph\nG++1r6FvSJ7z+QFlZx0G1nJ/4TvCcWCVHyDAORGhUQJADOsJFkM963/Jr+JTk405\nfYQQC9li0wUk/lwGilUMRkYunnX54hcJbLvEkJv0nyUK6l8wBKQd6czhQyu8DR6z\nOcNnlAjFWwKBgGAHCjXXy+ZXPt6rnL1N02TQYa9uxC08/RPtxVDtW6yPXgSbD6ON\nPva79AQqJQao2Yt/XJfsSD4wTLo5pKlhgdq9Xcymb3yVJaJPPGnNmwCcTu7+DAz8\nFs1VCinKf/duXN2ub9z4S1KQ93ppiRuzFIaCw4IcK/PovueoAP/E+aI9AoGAS8uT\n9M0H792F8dCmaB90mwBiJ/wcsqIHYhYC7jOGV6dqHATn/wcUejHLxo9z/hrdACRk\nMid2DvwHcAGLhUuznJaOvQuDRYzzmtEhtWMx42NdKh1JB1hcKeAAzAlfPQkX2WsN\nKsizaZ13y5TrBENfAFprpUafWggQbCZIMMTppasCgYAOYOe5ISIzF4Tu97AhtXxc\nq7a8FJybAO5y8vdVp6bOuShTL2d1rb/YUMkB7NT0ucK0lZhOo5EbYOz5XKDZ885U\nYSweRHfdsCl8jbSwcwIZh3bBAxWfNZZ2BqOqr/osJG8jO7trZIDmOry/YJhP85i2\ncdjswoNXUswuDEMA3PWamA==\n-----END PRIVATE KEY-----\n"
const GOOGLE_CLIENT_EMAIL = "rjindustries@mynodecalender.iam.gserviceaccount.com"
const GOOGLE_PROJECT_NUMBER = "639157883033"
const GOOGLE_CALENDAR_ID = "21223f6ac18d826252a8ee6aebaa9d98cd572b83df77411f4a1ab16ea75ced5b@group.calendar.google.com"


const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
);

const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
});

function getCalenderEvents(req, res) {
    calendar.events.list({
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (error, result) => {
        if (error) {
            console.log(error)
            res.send(JSON.stringify({ error: error }));
        } else {
            if (result.data.items.length) {
                res.send(JSON.stringify({ events: result.data.items }));
            } else {
                res.send(JSON.stringify({ message: 'No upcoming events found.' }));
            }
        }
    });
}

module.exports = {getCalenderEvents}