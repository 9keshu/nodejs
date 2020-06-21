const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log",{
    interval:'1d',
    path:logDirectory
});

const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'jaisingaji',
    db:'codeil_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            type:'login',
            user:'keshumalviya7@gmail.com',
            pass:'#oo9keshusingaji#7',
        }
    },
    google_client_id:'208646237670-br5vgla382brp71vn7jt3un8s88mt46l.apps.googleusercontent.com',
    google_client_secret:'0V3s2Fqo-BpqessSdnPmth1D',
    google_callback_url:'http://localhost:8000/users/auth/google/callback',
    jwt_secret:'codeil',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production = {
    name:'production',
    asset_path:process.env.CODEIL_ASSET_PATH,
    session_cookie_key:process.env.CODEIL_SESSION_COOKIE_KEY,
    db:process.env.CODEIL_DB,
    smtp:{
        service:process.env.CODEIL_SMTP_SERVICE,
        host:process.env.CODEIL_SMTP_HOST,
        port:587,
        secure:false,
        auth:{
            type:'login',
            user:process.env.CODEIL_SMTP_AUTH_USER,
            pass:process.env.CODEIL_SMTP_AUTH_PASS,
        }
    },
    google_client_id:process.env.CODEIL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIL_GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.CODEIL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

module.exports = eval(process.env.CODEIL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIL_ENVIRONMENT) ;