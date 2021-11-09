module.exports = d => {
    const data = d.util.openFunc(d);
    
    d.data.interaction?.deferReply().catch(e => {
        d.aoiError.fnError( d,'custom',{},'Failed To Reply With Reason: '+e )
    });
    
    return {
        code: d.util.setCode({ function : d.func,code : data.code }) 
    }
}