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
    let movieName = args.id || "";

    const movieQuery = movieName.split(" ").join("+");

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

// SVARBU – eksportuojame tik Vercel handlerį
module.exports = builder.getInterface();
