
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

    async uploadImage(musicalgroupDto, folder): Promise<string | null> {
        this.putConfigOptions();
        var url = null;
        try{
            await cloudinary.v2.uploader.upload(musicalgroupDto, { folder: folder,
            transformation: [
                {width: 400, height: 400, crop: "thumb"},
                ] },
                function (error, result) {
                    try {
                        url = result.url;

                    } catch (e){
                        url = null
                    }
                });
            } catch (e) {
                url = null
            }
        return url;
    }
}