var zfcCookieDomain = '.6pm.com',
    zfcXDHost = 'track.zappos.com',
    bmv = {},
    cst = 1,
    raz = 1;


var zfcUUID = function () {
    var a = function () {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
    };
    return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
}();
var zfcUPU = '/c/homepage-refresh';
var zfcAHW = [{
    h: 'a1.zassets.com',
    r: 3
}, {
    h: 'a2.zassets.com',
    r: 3
}, {
    h: 'a3.zassets.com',
    r: 4
}];
var hydraTests = [{
    name: "6egc",
    phase: 4,
    url: /^\/egiftcard/,
    variants: [{
        chance: 0
    }, {
        chance: 1,
        setup: function () {
            var a = window.location;
            /\/marty\//.test(a.pathname) || /bot/i.test(window.navigator.userAgent) || this.redirect(a.href = a.origin + "/marty/egiftcard")
        }
    }]
}, {
    name: "mpls",
    phase: 7,
    url: /./,
    variants: [{
        chance: 0,
        setup: function () {
        }
    }, {
        chance: 1,
        setup: function () {
            function boomerangSaveLoadTime(e) {
                win.BOOMR_onload = e && e.timeStamp || (new Date).getTime()
            }

            if (window.BOOMR && window.BOOMR.version) return;
            var is6pm = /6pm/.test(location.hostname);
            var isPreprod = /preprod/.test(location.hostname);
            var isMarty = /marty/.test(zfc.upstreamLabel);
            var key = is6pm && isPreprod ? "ENUK2-KLAR3-G7FT2-RSY5S-99ZWN" : is6pm ? "Q9XJS-7ECPU-YHG3G-HBMFB-9Q3DD" : "4R6KY-DUC9X-4J4BJ-TW8RG-UMPUN";
            var dom;
            var doc;
            var where;
            var iframe = document.createElement("iframe");
            var win = window;
            if (win.addEventListener) win.addEventListener("load", boomerangSaveLoadTime, false);
            else if (win.attachEvent) win.attachEvent("onload", boomerangSaveLoadTime);
            iframe.src = "javascript:void(0)";
            iframe.title = "";
            iframe.role = "presentation";
            (iframe.frameElement || iframe).style.cssText = "width:0;height:0;border:0;display:none;";
            where = document.getElementsByTagName("script")[0];
            where.parentNode.insertBefore(iframe, where);
            try {
                doc = iframe.contentWindow.document
            } catch (e$$1) {
                dom =
                    document.domain;
                iframe.src = "javascript:var d=document.open();d.domain='" + dom + "';void(0);";
                doc = iframe.contentWindow.document
            }
            doc.open()._l = function () {
                var js = this.createElement("script");
                if (dom) this.domain = dom;
                js.id = "boomr-if-as";
                js.src = "https://s.go-mpulse.net/boomerang/" + key;
                BOOMR_lstart = (new Date).getTime();
                this.body.appendChild(js)
            };
            doc.write('<body onload="document._l();">');
            doc.close();
            if (!isMarty) {
                window.BOOMR_config = window.BOOMR_config || {};
                BOOMR_config.autorun = true;
                BOOMR_config.History = {
                    enabled: false
                }
            }
        }
    }]
}, {
    name: "saui",
    phase: 1,
    url: /./,
    variants: [{
        chance: 1,
        setup: function () {
        }
    }, {
        chance: 0,
        setup: function () {
            window.saui = 1
        }
    }]
}, {
    name: "mnc6d",
    phase: 1,
    url: /^\/checkout/,
    variants: [{
        chance: 1
    }, {
        chance: 0,
        setup: function () {
            var a = window.location;
            !a.host.match("m.6pm.com") && (/\/marty\/checkout/.test(a.pathname) || this.redirect(a.href = a.origin + "/marty/checkout"))
        }
    }]
}, {
    name: "msar",
    phase: 7,
    url: /^RRH$/,
    variants: [{
        chance: 0
    }, {
        chance: 1
    }]
}, {
    name: "mzcs",
    phase: 6,
    url: /^RRH$/,
    variants: [{
        chance: 0
    }, {
        chance: 1
    }]
}, {
    name: "dpdpv",
    phase: 6,
    url: /^RRH$/,
    variants: [{
        chance: .5
    }, {
        chance: .5
    }]
}, {
    name: "llpdp",
    phase: 11,
    url: /^RRH$/,
    variants: [{
        chance: 0
    }, {
        chance: 1
    }]
}, {
    name: "mpdpyv",
    phase: 1,
    url: /^RRH$/,
    variants: [{
        chance: 1
    }, {
        chance: 0
    }]
}];
var zfc = [];
zfc.push(['initialize', '1525172981529', (new Date).getTime(), '6pm_supercloud_gateway_ssl', 'www.6pm.com', zfcUPU, '255b08e2-4d30-11e8-af76-8512aa7b604e', zfcUUID]);
zfc.push(['setEventUrl', '/event.cgi']);


(function (a, b, c, d) {
    function e(a) {
        return /Android.*Mobile/i.test(a)
    }

    function f(a) {
        return /iPhone/i.test(a)
    }

    function g(a) {
        return /Windows Phone/i.test(a)
    }

    function h(a) {
        return /BB10.+Mobile/i.test(a)
    }

    function i(a) {
        return !g(a) && /Windows.+; Touch/.test(a)
    }

    function j() {
        return /nomobile=true/.test(c.toString())
    }

    function k(a) {
        var b = [h, f, e],
            c = b.length;
        while (c--)
            if (b[c](a)) return !0
    }

    function l() {
        var a = d.userAgent,
            b = c.hostname,
            e = !j() && !o("noMobileSix") && k(a);
        if (!e) return q("desktop");
        q("mobile");
        if (/scdemo.6pm.com/.test(b)) return m(b.replace(/scdemo.6pm.com/, "m-scdemo.6pm.com"));
        var f = b.match(/^www\.6pm\.com$/);
        f && m("m.6pm.com")
    }

    function m(b) {
        a.rq || (a.rq = []), rq.push(["switchHost", b])
    }

    function n(a, b, c, d) {
        var e, f;
        c && (f = new Date, f.setTime(f.getTime() + c * 864e5), e = "; expires=" + f.toGMTString()), d = d && d != "" ? "; domain=" + d : "", document.cookie = a + "=" + b + (e ? e : "") + "; path=/" + d
    }

    function o(a) {
        var b = document.cookie.match("(?:^|;) *" + a + "=([^;]*)");
        return b ? b[1] : null
    }

    function p(a) {
        return !1
    }

    function q(a) {
        o("deviceType") || n("deviceType", a, 3650, ".6pm.com")
    }

    function r() {
        window.z = window.z || {
            killed: p
        }
    }

    "use strict", r(), z.killed("sixMobileRedirect") || l()
})(window, document, location, navigator)


(function (w) {
    if (typeof (console) === 'undefined') {
        var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
            "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"
        ];
        w.console = {};
        for (var i = 0; i < names.length; ++i) w.console[names[i]] = function () {
        };
    }
})(window);
