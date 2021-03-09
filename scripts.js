function getParamValue(input) {
    var value = document.getElementById(input).value;
    if(value) {
        return value
    } 
}

function loopParams(input, arr) {
    var output = input;
    for(i = 0; i < arr.length; i++) {
        var value = getParamValue(arr[i]);
        if (value) {
            output += "&" + arr[i] + "=" + value
        }
    }
    return output
}

function getRadioVal() {
    var output = "";

    if (document.getElementById('apples').checked) {
        output = "apples";
    } else if (document.getElementById('bananas').checked) {
        output = "bananas";
    } else if (document.getElementById('peaches').checked) {
        output = "peaches";
    } 
    // else if (document.getElementById('custom').checked) {
    //     output = document.getElementById('custom_value').value;
    // }

    return output
}

function generateURL() {
    
    document.getElementById("qrcode").innerHTML = ""
    var finalURL = "";
    var url = getParamValue('baseURL');
    var pid = getParamValue('pid');
    var params = [
        'c','af_sub1','af_ios_url','af_android_url','af_web_dp','af_num'
        //,'af_channel','af_adset','af_ad'
    ]

    if(url) {
        if(pid) {
            finalURL += url;
            finalURL += "?pid=" + pid;

            if(getRadioVal()) {
                finalURL += "&deep_link_value=" + getRadioVal();
            }

            finalURL = loopParams(finalURL, params);
        } else {
            alert("Media Source value required. Enter and try again.")
        }
    } else {
        alert("Base URL value required. Enter and try again.")
    }

    if(finalURL != "") {

        document.getElementById("output").value = finalURL

        document.getElementById("linkArea").href = finalURL

        const qrLocation = document.getElementById("qrcode")

        // Options
        var options = {
            text: finalURL += "&af_qr=true",
            quietZone: 10,
        };
        
        // Create QRCode Object
        new QRCode(qrLocation, options);

        qrLocation.scrollIntoView({behavior: "smooth"})
    }
}
