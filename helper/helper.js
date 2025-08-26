const fs = require('fs');
const crypto = require('crypto');
const logger = require('./logger');
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

module.exports = {
    isObjectContainsKey: (obj, val) => {
        if (val === undefined || val === null) {
            return false;
        }
        let keys = Object.keys(obj);
        for(let key in keys){
            if (obj[keys[key]] === val) {
                return true;
            }
        }
        return false;
    },
    isValidURL(str) {
        let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    },
    getDefaultValueOnNull(val, defaultValue = null) {
        if (val !== null && val !== undefined) {
            return val;
        }
        return defaultValue != null ? defaultValue : '';
    },
    getBoolean(val) {
        val = val !== undefined ? val.toString().toLowerCase().trim() : false;
        switch (val) {
            case "true":
            case true:
            case "1":
                return true;
            case "false":
            case false:
            case "0":
                return false;
            default:
                Boolean(val);
        }
    },
    deleteFileIfExists: (path) => {
        return new Promise((callback) => {
            fs.access(path, fs.F_OK, (err) => {
                if (err) {
                    //file does not exists
                    return callback(false);
                }
                //file exists need to delete
                fs.unlink(path, (err) => {
                    if (err) {
                        return callback(false);
                    }
                    callback(true);
                });
            });
        });
    },
    reviewStatusConstrains: {
        pendingForApproval: 'pending_for_approval',
        approved: 'approved',
        hidden: 'hidden',
        deleted: 'deleted',
    },
    inquiryStatusConstrains: {
        deleted: 0,
        initiated: 1,
        sent: 2,
        inProgress: 3,
        processed: 4,
    },
    encrypt: (text) => {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')};
    },
    decrypt: (text) => {
        let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    },
    encodeBase64(txt){
        let buff = Buffer.from(txt);
        return buff.toString('base64');
    },
    decodeBase64(txt){
        let buff = Buffer.from(txt, 'base64');
        return buff.toString('ascii');
    },
    sendSuccess: (res, data, msg = 'done')=>{
        return res.status(200).send({
            success: true,
            msg : msg,
            data : data
        });
    },
    sendError: (res, errors = {}, msg = 'error', code = 400)=>{
        return res.status(code).send({
            success: false,
            msg : msg,
            errors: errors
        });
    },
    sendServerError: (res, errors = {}, msg = 'Server error', code = 500)=>{
        logger.error(errors);
        return res.status(code).send({
            success: false,
            msg : msg,
            errors: errors
        });
    },
    sendDatabaseError: (res, errors = {}, msg = 'Db error', code = 502)=>{
        logger.error(errors);
        return res.status(code).send({
            success: false,
            msg : msg,
            errors: errors
        });
    }
}
