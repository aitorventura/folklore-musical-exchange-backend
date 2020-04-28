import { ConfigOptions, v2 } from '../../node_modules/cloudinary/types';
import axios, { AxiosRequestConfig } from "axios";
import { url } from 'inspector';
const cloudinary = require('cloudinary')

export class Cloudinary {
    constructor() { }
    putConfigOptions() {
        cloudinary.config({
            cloud_name: "dc82hcjha",
            api_key: "142677946896513",
            api_secret: "MXIf_R6bEfN-JafogE1W3ITSTcM"
        });

    }

    async uploadImage(musicalgroupDto, folder): Promise<string> {
        this.putConfigOptions();
        var url = null;
        await cloudinary.v2.uploader.upload(musicalgroupDto, { folder: folder },
            function (error, result) {
                console.log(error);
                console.log(result.url);
                url = result.url;
            });
        return url;
    }
}