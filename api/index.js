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

// META handler
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

// STREAM handler
builder.defineStreamHandler(() => {
    return { streams: [] };
});

const addonInterface = builder.getInterface();

// Vercel serverless entry
module.exports = (req, res) => {
    addonInterface.serveHTTP(req, res);
};
