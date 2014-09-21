var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');
var getName = require('./getName');
var blpapi = require('blpapi');
var c = require('./Console');


function getQuotes(symbol, cb){
    // Add 'authenticationOptions' key to session options if necessary.
    var session = new blpapi.Session({ serverHost: '10.8.8.1',
                                       serverPort: 8194 });
    var service_refdata = 1; // Unique identifier for refdata service

    var seclist = [symbol + ' US Equity'];

    var long_name,
        quote,
        data;


    session.on('SessionStarted', function(m) {
        session.openService('//blp/refdata', service_refdata);
    });

    session.on('ServiceOpened', function(m) {
        // Check to ensure the opened service is the refdata service
        if (m.correlations[0].value == service_refdata) {
            session.request('//blp/refdata', 'ReferenceDataRequest',
                { securities: seclist, fields: ['LONG_COMP_NAME', 'PROF_MARGIN', 'REVENUE_PER_SH',
                'EBITDA', 'EPS_GROWTH', 'IS_EPS', 'CUR_RATIO', 'BEST_PX_BPS_RATIO', 'DIVIDEND_YIELD',
                'OPER_MARGIN', 'BEST_NI_ADJ_TO_SALES', 'RETURN_COM_EQY', 'NUM_INSIDERS_BUYING_SHARES',
                'HIGH_52WEEK', 'EQY_SH_OUT'] }, 100);
            session.request('//blp/refdata', 'HistoricalDataRequest',
            { securities: seclist,
              fields: ['PX_LAST', 'CUR_MKT_CAP', 'PE_RATIO', 'PX_TO_SALES_RATIO'],
              startDate: "20140919",
              endDate: "20140919",
              periodicitySelection: "DAILY" }, 101);
        }
    });

    var responses = 0;
    function checkStop() {
        responses++;
        // Signal stop once all final responses have been received
        if (responses == 2){
            session.stop();
            for (var attrname in data) { quote[0][attrname] = data[attrname]; }
            var ret = {symbol: symbol, name:long_name, quote:quote}
            fs.writeFile('DataFinal/' + symbol + '.json', JSON.stringify(ret), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(symbol + '.json was saved!');
                }
            });
        }
    }

    session.on('HistoricalDataResponse', function(m) {
        //console.log(m.data.securityData.fieldData);
        quote = m.data.securityData.fieldData;
        // At this point, m.correlations[0].value will equal:
        // 101 -> HistoricalDataResponse for both securities
        //
        // m.eventType == 'PARTIAL_RESPONSE' until finally
        // m.eventType == 'RESPONSE' to indicate there is no more data
        if (m.correlations[0].value === 101 && m.eventType === 'RESPONSE'){
            checkStop();
        }
    });

    session.on('ReferenceDataResponse', function(m) {
      //console.log(m.data.securityData[0].fieldData);
      long_name = m.data.securityData[0].fieldData.LONG_COMP_NAME;
      data = m.data.securityData[0].fieldData;
      // At this point, m.correlations[0].value will equal:
      // 100 -> ReferenceDataResponse for long-form company names
      if (m.correlations[0].value === 100 && m.eventType === 'RESPONSE')
          checkStop();
    });

    session.on('SessionTerminated', function(m) {
        session.destroy();
    });

    session.start();

}
module.exports = getQuotes;
