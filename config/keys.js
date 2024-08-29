if(process.env.NODE_ENV === 'production'){
    modules.exports = require('./prod');
}else{
    // dev
    module.exports = require('./dev');

}