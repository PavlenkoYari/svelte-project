import nodemailer from "nodemailer"
import fs from "fs";
import handlebars from 'handlebars';

export async function sendEmail(pathToEmailTemplate, variables, options) {
    function readHTMLFile (path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };

    let transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
           user: 'test@gmail.com',
           pass: 'test123'
         }
    });


    readHTMLFile(pathToEmailTemplate, async (err, html) => {
        const template = handlebars.compile(html);
        const htmlToSend = template(variables);

        options = {
            ...options,
            from: 'test@gmail.com',
            html : htmlToSend
        }
        let result = await transporter.sendMail(options, function functionName(error, info) {
            if(error){
                console.log("Error");
            }
            else {
                console.log("Email sent:" + info.response);
            }
        });
    })
}
