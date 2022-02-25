const express = require('express')
const router = express.Router()
const mssql = require('mssql')
const pool = new mssql.ConnectionPool({
    server : '192.168.1.200',
    port : 8092,
    user : 'sa',
    password : 'wononetech0401^^>@)))))',
    database : 'ctc_config',
    pool : {
        max : 10,
        min : 0,
        idleTimeoutMillis : 30000
    },
    options : {
        encrypt : true,
        trustServerCertificate : true
    }
}).connect()

const mssqlTest = ()=>{
    return new Promise(resolve=>{
        let startTime = new Date('2022-02-01 00:00:00').toISOString()
        let endTime = new Date('2022-02-02 00:00:00').toISOString()
        pool.then(pool=>{
            let sqlQuery = `select tagName,timestamp,value from ctc_fn_PARCdata_ReadInterpolatedTags('I.G1.300:FC015.PV','${startTime}','${endTime}','TIMEAVERAGE','900',',')`
            pool.request().query(sqlQuery).then(result=>resolve(result.recordset))
        }).catch(err=>{
            if(err) throw err
        })
    })
}

router.get('/',(req,res,next)=>{
    mssqlTest().then(data=>res.json(data)).catch(next)
})

module.exports = router