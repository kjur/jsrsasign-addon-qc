const VERSION = "0.9.4";
const VERSION_FULL = "jsrsasign-addon-qc 0.9.4 (c) Kenji Urushima github.com/kjur/jsrsasign-addon-qc";

const OIDs = {
    // RFC 3739 QC
    "qcStatements":		"1.3.6.1.5.5.7.1.3",
    // ETSI EN 319 412-5 Certificate Profile Part5 QCStatements
    "etsiQcsCompliance":	"0.4.0.1862.1.1",
    "etsiQcsQcSSCD":		"0.4.0.1862.1.4",
    "etsiQcsQcType":		"0.4.0.1862.1.6",
    "etsiQcsQctEsign":		"0.4.0.1862.1.6.1",
    "etsiQcsQctEseal":		"0.4.0.1862.1.6.2",
    "etsiQcsQctWeb":		"0.4.0.1862.1.6.3"
};

let _KJUR = null;
let _X509 = null;
let _ASN1HEX = null;

function register(jsrsasign) {
    registerParts(jsrsasign.KJUR, jsrsasign.X509, jsrsasign.ASN1HEX);
}

function registerParts(argKJUR, argX509, argASN1HEX) {
    _KJUR = argKJUR;
    _X509 = argX509;
    _ASN1HEX = argASN1HEX;
    _KJUR.asn1.x509.OID.registerOIDs(OIDs);
    _X509.registExtParser("1.3.6.1.5.5.7.1.3", extParserQc);
}

function extParserQc(oid, critical, hExtV) {
    try {
	let pExtV = _ASN1HEX.parse(hExtV);
	let aQS = [];
	pExtV.seq.map((elem) => {
	    try {
		let pQS = { id: elem.seq[0].oid };
		try {
		    pQS.type = elem.seq[1].seq[0].oid;
		} catch(ex2) {};
		aQS.push(pQS);
	    } catch(ex) {};
	});
	var result = {
	    extname: _KJUR.asn1.x509.OID.oid2name(oid),
	    array: aQS,
	    //asn1obj: _ASN1HEX.parse(hExtV),
	};
	if (critical) result.critical = true;
        //alert(hExtV);
	return result;
    } catch(ex) {
	return undefined;
    }
}

exports.VERSION = VERSION;
exports.VERSION_FULL = VERSION_FULL;
exports.OIDs = OIDs;
exports.register = register;
exports.registerParts = registerParts;
