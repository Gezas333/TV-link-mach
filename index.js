const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    id: "lt.search.tvbro",
    version: "1.0.0",
    name: "Search on Page (TV Bro)",
    description: "Prideda mygtuką filmams Stremio, kuris atidaro TV Bro su paieška puslapis.ai",
    logo: "https://stremio.com/asset/logo-small.png",
    resources: ["stream", "meta"],
    types: ["movie"],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineMetaHandler(async (args) => {

    // filmo pavadinimas iš IMDB ID (arba kito ID)
    let movieName = args.id || "";

    // Konvertuojame tarpus į +
    const movieQuery = movieName.split(" ").join("+");

    // TV Bro URL
    const searchUrl = `https://torrent.ai/lt/torrents=${movieQuery}`;

    return {
        meta: {
            id: args.id,
            type: "movie",
            name: movieName,

            // Mūsų custom mygtukas
            links: [
                {
                    name: "Search on Page",
                    url: searchUrl
                }
            ]
        }
    };
});

// Būtina nurodyti tuščius stream
builder.defineStreamHandler(() => {
    return { streams: [] };
});

module.exports = builder.getInterface();

if (!module.parent) {
    const http = require("http");
    http.createServer((req, res) => {
        builder.getInterface().serveHTTP(req, res);
    }).listen(7000);

    console.log("Addon running on http://localhost:7000/manifest.json");
}
