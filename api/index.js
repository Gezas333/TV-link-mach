const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    id: "lt.search.tvbro",
    version: "1.0.0",
    name: "Search on Page (TV Bro)",
    description: "Prideda mygtuką filmams Stremio, kuris atidaro TV Bro su paieška puslapis.ai",
    logo: "https://stremio.com/asset/logo-small.png",

    catalogs: [], // ← būtina, net jei katalogų nėra

    resources: ["stream", "meta"],
    types: ["movie"],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineMetaHandler(async (args) => {
    const movieName = args.id || "";
    const movieQuery = movieName.replace(/\s+/g, "+");

    const searchUrl = `https://torrent.ai/lt/torrents=${movieQuery}`;

    return {
        meta: {
            id: args.id,
            type: "movie",
            name: movieName,
            links: [
                {
                    name: "Search on Page",
                    url: searchUrl
                }
            ]
        }
    };
});

builder.defineStreamHandler(() => {
    return { streams: [] };
});

const addonInterface = builder.getInterface();

module.exports = (req, res) => {
    addonInterface.serveHTTP(req, res);
};
