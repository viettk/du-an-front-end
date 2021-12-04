const CookieService = {
    getCookie:(cname)=>{
        let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
    },
    setCookie:(cname, cvalue, exdays)=>{
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires+"; " +'path=' + '/';
    },
    removeCookie:()=>{
            let cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                let eqPos = cookie.indexOf("=");
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + '=;' +
                    'expires=Thu, 01-Jan-1970 00:00:01 GMT;'+
                    'path=' + '/;';
            }
        }

}
export default CookieService;