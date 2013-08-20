// ABMNZN SDK 2013-04-23-fry3hc77
(function () {
    var e = void 0,
        g = null,
        h = !1;

    function i(a) {
        return function () {
            return this[a]
        }
    }
    var k;

    function l(a, b) {
        if (a === g || a === e) a = {};
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d !== g && d !== e)
                for (var f in d) a[f] = d[f]
        }
        return a
    }

    function m(a, b) {
        var c = n.apply(e, arguments),
            d = c;
        window.console && window.console.log && ("function" == typeof d && (d = d()), d = n("[Amazon.%s] %s", "error", d), window.console.log(d));
        throw Error(c);
    }

    function n(a, b) {
        var c = arguments,
            d = 1;
        return a.replace(/%((%)|[sid])/g, function (a) {
            if (a[2]) return a[2];
            a = c[d++];
            "object" == typeof a && (window.JSON && window.JSON.stringify) && (a = window.JSON.stringify(a));
            return a
        })
    }

    function p() {
        this.a = []
    }
    p.prototype.b = function (a) {
        var b = this.a;
        this.a = [];
        for (var c = 0; c < b.length; c++) b[c].h && this.a.push(b[c]);
        for (c = 0; c < b.length; c++) b[c].g.apply(e, arguments)
    };
    var r, s, t, u = {
            '"': '"',
            "\\": "\\",
            "/": "/",
            j: "\b",
            k: "\f",
            l: "\n",
            m: "\r",
            n: "\t"
        }, x;

    function y(a) {
        throw {
            name: "SyntaxError",
            message: a,
            i: s,
            text: x
        };
    }

    function z(a) {
        a && a !== t && y("Expected '" + a + "' instead of '" + t + "'");
        t = x.charAt(s);
        s += 1;
        return t
    }

    function A() {
        var a;
        a = "";
        "-" === t && (a = "-", z("-"));
        for (;
            "0" <= t && "9" >= t;) a += t, z();
        if ("." === t)
            for (a += "."; z() && "0" <= t && "9" >= t;) a += t;
        if ("e" === t || "E" === t) {
            a += t;
            z();
            if ("-" === t || "+" === t) a += t, z();
            for (;
                "0" <= t && "9" >= t;) a += t, z()
        }
        a = +a;
        if (isFinite(a)) return a;
        y("Bad number")
    }

    function B() {
        var a, b, c = "",
            d;
        if ('"' === t)
            for (; z();) {
                if ('"' === t) return z(), c;
                if ("\\" === t)
                    if (z(), "u" === t) {
                        for (b = d = 0; 4 > b; b += 1) {
                            a = parseInt(z(), 16);
                            if (!isFinite(a)) break;
                            d = 16 * d + a
                        }
                        c += String.fromCharCode(d)
                    } else if ("string" === typeof u[t]) c += u[t];
                else break;
                else c += t
            }
        y("Bad string")
    }

    function C() {
        for (; t && " " >= t;) z()
    }

    function D() {
        switch (t) {
        case "t":
            return z("t"), z("r"), z("u"), z("e"), !0;
        case "f":
            return z("f"), z("a"), z("l"), z("s"), z("e"), h;
        case "n":
            return z("n"), z("u"), z("l"), z("l"), g
        }
        y("Unexpected '" + t + "'")
    }
    var E;
    E = function () {
        C();
        switch (t) {
        case "{":
            var a;
            a: {
                var b = {};
                if ("{" === t) {
                    z("{");
                    C();
                    if ("}" === t) {
                        z("}");
                        a = b;
                        break a
                    }
                    for (; t;) {
                        a = B();
                        C();
                        z(":");
                        Object.hasOwnProperty.call(b, a) && y('Duplicate key "' + a + '"');
                        b[a] = E();
                        C();
                        if ("}" === t) {
                            z("}");
                            a = b;
                            break a
                        }
                        z(",");
                        C()
                    }
                }
                y("Bad object");
                a = e
            }
            return a;
        case "[":
            a: {
                a = [];
                if ("[" === t) {
                    z("[");
                    C();
                    if ("]" === t) {
                        z("]");
                        break a
                    }
                    for (; t;) {
                        a.push(E());
                        C();
                        if ("]" === t) {
                            z("]");
                            break a
                        }
                        z(",");
                        C()
                    }
                }
                y("Bad array");
                a = e
            }
            return a;
        case '"':
            return B();
        case "-":
            return A();
        default:
            return "0" <= t && "9" >=
                t ? A() : D()
        }
    };
    r = function (a, b) {
        var c;
        x = a;
        s = 0;
        t = " ";
        c = E();
        C();
        t && y("Syntax error");
        return "function" === typeof b ? function f(a, c) {
            var w, J, q = a[c];
            if (q && "object" === typeof q)
                for (w in q) Object.prototype.hasOwnProperty.call(q, w) && (J = f(q, w), J !== e ? q[w] = J : delete q[w]);
            return b.call(a, c, q)
        }({
            "": c
        }, "") : c
    };

    function F(a) {
        var b = "",
            c;
        for (c in a) b && (b += "&"), b += encodeURIComponent(c) + "=" + encodeURIComponent(a[c] + "");
        return b
    }

    function G(a, b, c, d, f, j) {
        this.a = new H(a, b, c);
        ("string" != typeof d || !d) && m("missing or invalid path: %s", d);
        this.f = d;
        "object" == typeof f && (f = F(f));
        f && "string" != typeof f && m("invalid query: %s", f);
        this.c = f || "";
        "object" == typeof j && (j = F(j));
        j && "string" != typeof j && m("invalid fragment: %s", j);
        this.b = j || ""
    }

    function I(a) {
        var b = document.createElement("div");
        b.innerHTML = "<a></a>";
        b.firstChild.href = a;
        b.innerHTML = b.innerHTML;
        a = b.firstChild;
        b = a.port;
        if (!b || "0" == b) b = g;
        var c = a.pathname;
        c ? "/" != c[0] && (c = "/" + c) : c = "/";
        return new G(a.protocol, a.hostname, b, c, a.search.substring(1), a.hash.substring(1))
    }
    k = G.prototype;
    k.scheme = function () {
        return this.a.scheme()
    };
    k.host = function () {
        return this.a.host()
    };
    k.port = function () {
        return this.a.port()
    };
    k.path = i("f");
    k.e = i("c");
    k.d = i("b");
    k.toString = function () {
        var a = this.a.toString(),
            a = a + this.f,
            a = a + (this.c ? "?" + this.c : "");
        return a += this.b ? "#" + this.b : ""
    };

    function K(a, b) {
        return new G(b.scheme !== e ? b.scheme : a.scheme(), b.host !== e ? b.host : a.host(), b.port !== e ? b.port : a.port(), b.path !== e ? b.path : a.path(), b.e !== e ? b.e : a.e(), b.d !== e ? b.d : a.d())
    }

    function H(a, b, c) {
        var d;
        ("string" != typeof a || !(d = a.match(/^(https?)(:(\/\/)?)?$/i))) && m("missing or invalid scheme: %s", a);
        this.a = "http" == d[1] ? "http" : "https";
        ("string" != typeof b || !b.match(/^[\w\.\-]+$/)) && m("missing or invalid host: %s", b);
        this.c = b;
        if (c && ((c + "").match(/^\d+$/) || m("invalid port: %s", c), 80 == c && "http" == this.a || 443 == c && "https" == this.a)) c = g;
        this.b = c ? c + "" : g
    }
    var L = /^(http|https):\/\/([a-z0-9\-\.]+)(:(\d+))?$/i;
    H.prototype.scheme = i("a");
    H.prototype.host = i("c");
    H.prototype.port = i("b");
    H.prototype.toString = function () {
        var a;
        a = "" + (this.a + "://");
        a += this.c;
        return a += this.b ? ":" + this.b : ""
    };

    function M(a, b, c, d) {
        return new G(a.a, a.c, a.b, b, c, d)
    }

    function aa() {
        var a = N;
        if (window.__toucanForceProxyOriginTo) {
            var a = window.__toucanForceProxyOriginTo,
                b = a.match(L);
            if (b) a = new H(b[1], b[2], b[4] ? b[4] - 0 : g);
            else throw m("invalid origin: %s", a), Error();
            return a
        }
        if (window.__toucanForceProxyOriginToThisOrigin) return I(window.location.href + "").a;
        if (b = a.host().match(/^([\w\-\.]+\.)?amazon\.([\w\.]+)$/)) {
            if ("https" == a.scheme()) return new H("https", "api-cdn.amazon." + b[2], g);
            m("no proxy origin; unsupported non-https target origin for amazon: %s", a)
        }
        m("no proxy origin; unsupported target origin: %s",
            a);
        throw Error();
    }

    function O(a) {
        for (var b = "", c = 0; c < a; c++) b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
        return b
    }
    var P = {}, Q = g;

    function R() {
        return K(I(window.location.href + ""), {
            d: ""
        })
    }

    function ba(a, b) {
        var c = {
            uri: R().toString(),
            tr: b.name()
        };
        return M(a, "/sdk/2013-04-23-fry3hc77/proxy.html", {
            version: "1"
        }, c)
    }
    var ca = /^ABMNZNXDC;([\w\d\_\-]+);(.+)$/;

    function S(a) {
        var b = a.match(ca);
        if (b) {
            a = {};
            a.id = b[1];
            for (var c = {}, b = b[2].split("&"), d = 0; d < b.length; d++) {
                var f = b[d].split("=");
                2 == f.length && (c[f[0]] = decodeURIComponent(f[1].replace(/\+/g, " ")))
            }
            a.data = c;
            return a
        }
        return g
    }

    function T() {
        this.a = e
    }
    T.prototype.name = function () {
        return "pm"
    };
    T.prototype.b = function (a, b) {
        if (this.a === e) {
            var c = this.a = new p,
                d = function (a) {
                    var b;
                    (b = S(a.data)) && c.b(a.origin, b.id, b.data)
                };
            window.addEventListener ? window.addEventListener("message", d, h) : window.attachEvent ? window.attachEvent("onmessage", d) : m("cannot attach message event")
        }
        var f = a.toString();
        this.a.a.push({
            g: function (a, c, d) {
                a != f || b(c, d)
            },
            h: !0
        })
    };
    T.prototype.send = function (a, b, c) {
        var d = a.a;
        setTimeout(function () {
            window.parent.postMessage(n("%s;%s;%s", "ABMNZNXDC", b, F(c)), d.toString())
        }, 1)
    };

    function U() {}
    U.prototype.name = function () {
        return "fr"
    };
    U.prototype.b = function (a, b) {
        window.__toucanInvokeFragment = function (a, d) {
            b(a, d)
        }
    };
    U.prototype.send = function (a, b, c) {
        var d = a.e();
        (d = d || "") && (d += "&");
        d = d + "ABMNZNXDC" + ("=" + O(8));
        a = K(a, {
            e: d,
            d: n("%s;%s;%s", "ABMNZNXDC", b, F(c))
        });
        b = document.createElement("iframe");
        b.setAttribute("src", a.toString());
        document.body.appendChild(b)
    };
    var V = window.location.hash.substring(1);
    if (V) {
        var W = S(V);
        W && (document.documentElement.style.display = "none", "function" == typeof window.parent.parent.__toucanInvokeFragment && window.parent.parent.__toucanInvokeFragment(W.id, W.data))
    }
    var X = e,
        Y = "www.amazon.com",
        N = new H("https", Y, g);

    function da(a, b) {
        2 > arguments.length && m("authorize expects two arguments (options, next)");
        a && "object" != typeof a && m("authorize expects options parameter to be an object");
        "function" != typeof b && "string" != typeof b && m("authorize expects next parameter to be a function or a string");
        a = l({
            popup: !0,
            response_type: "token",
            state: e,
            scope: e
        }, a || {});
        if (a.popup) {
            var c;
            c = aa();
            if (!Q) {
                var d = window.postMessage ? "pm" : "fr";
                window.__toucanForceTransport && (d = window.__toucanForceTransport);
                if ("pm" == d) d = new T;
                else if ("fr" ==
                    d) d = new U;
                else throw m("unknown transport: %s", d), Error();
                Q = d;
                Q.b(c, function (a, b) {
                    var c = P[a];
                    c && c.b(b)
                })
            }
            var f = Q,
                d = c.host().replace(/[^a-z0-9]/ig, "_");
            c.port() && (d += "_" + c.port());
            var d = n("amazon-proxy-%s-%s", c.scheme(), d),
                j = document.getElementById(d);
            if (!j) {
                j = document.createElement("iframe");
                j.setAttribute("id", d);
                j.setAttribute("name", d);
                j.setAttribute("src", ba(c, f).toString());
                f = document.getElementById("amazon-proxy-root");
                if (!f) {
                    f = document.createElement("div");
                    f.setAttribute("id", "amazon-proxy-root");
                    f.setAttribute("width", 0);
                    f.setAttribute("height", 0);
                    f.setAttribute("style", "position: absolute; left: -1000px; top: -1000px");
                    f.style.setAttribute && f.style.setAttribute("cssText", "position: absolute; left: -1000px; top: -1000px");
                    var v = document.getElementById("amazon-root");
                    v || (v = document.createElement("div"), v.setAttribute("id", "amazon-root"), document.body.appendChild(v));
                    v.appendChild(f)
                }
                f.appendChild(j)
            }
            j = O(16);
            P[j] || (P[j] = new p);
            P[j].a.push({
                g: function (a) {
                    window.open("", "amazonloginpopup").close();
                    var c = b;
                    if ("function" == typeof c) c(a);
                    else {
                        var d = c,
                            d = d + (-1 == d.indexOf("?") ? "?" : "&"),
                            d = d + F(a),
                            a = I(d),
                            f = I(window.location.href + "");
                        "https" != a.scheme() && m("attempted redirect to %s but scheme is not HTTPS", c);
                        a.host() != f.host() && m("attempted redirect to %s but it does not match current host %s", a.host(), f.host());
                        window.location.href = d
                    }
                },
                h: h
            });
            d = {
                uri: R().toString(),
                proxy: d,
                topic: j,
                version: "1"
            };
            c = M(c, "/sdk/2013-04-23-fry3hc77/topic.html", d, "");
            c = Z(a, c);
            d = (window.screenX !== e ? window.screenX : window.screenLeft) +
                Math.floor(((window.outerWidth !== e ? window.outerWidth : document.documentElement.clientWidth) - 800) / 2);
            j = (window.screenY !== e ? window.screenY : window.screenTop) + Math.floor(((window.outerHeight !== e ? window.outerHeight : document.documentElement.clientHeight) - 540) / 2);
            d = n("left=%s,top=%s,width=%s,height=%s,location=1", 0 > d ? 0 : d, 0 > j ? 0 : j, 800, 540);
            window.open(c.toString(), "amazonloginpopup", d)
        } else "string" != typeof b && m("next must be redirect URI if !options.popup"), b += "", window.location.href = Z(a, I(b)).toString()
    }

    function Z(a, b) {
        a.response_type || m("missing options.response_type");
        "string" != typeof a.response_type && m("expected options.response_type to be a string");
        a.scope || m("missing options.scope");
        a.scope.constructor === Array && (a.scope = a.scope.join(","));
        "string" != typeof a.scope && m("expected options.scope to be a string or array");
        var c = {
            client_id: X,
            redirect_uri: b,
            response_type: a.response_type,
            scope: a.scope
        };
        a.state && (c.state = a.state);
        return M(N, "/ap/oa", c)
    }

    function $(a, b) {
        var c;
        try {
            c = r(a)
        } catch (d) {
            c = g
        }
        if (c && c.Error) {
            var f = {
                success: h
            };
            f.error = n("%s: %s", c.Error.Code || "UnknownError", c.Error.Message || "An unknown error occurred");
            b(f)
        } else c && c.Profile ? (f = {
            success: !0
        }, f.profile = c.Profile, b(f)) : (f = {
            success: h,
            error: "UnknownError: Incomprehensible response from profile endpoint"
        }, b(f))
    }
    window.amazon = window.amazon || {};
    window.amazon.Login = window.amazon.Login || {};
    window.amazon.Login.setClientId = function (a) {
        a.match(/^[\w\-\.]+$/) || m("invalid client ID: %s", a);
        X = a
    };
    window.amazon.Login.setDomain = function (a) {
        var b = a.match(/^((http|https):\/\/)?([a-z0-9\-\.]+)(:(\d+))?\/?$/i);
        b || m("invalid domain: %s", a);
        var c = b[2] ? b[2].toLowerCase() : "https";
        "https" != c && m("invalid domain: %s; scheme must be https");
        var d = b[3];
        d.match(/^amazon\.[a-z\.]+$/) && (d = "www." + d);
        b = b[5];
        Y = a;
        N = new H(c, d, b)
    };
    window.amazon.Login.authorize = function (a, b) {
        return da(a, b)
    };
    window.amazon.Login.retrieveProfile = function (a, b) {
        a || m("missing access token");
        b || m("missing callback");
        if (window.XMLHttpRequest && "withCredentials" in new window.XMLHttpRequest || "undefined" !== typeof window.XDomainRequest) {
            var c = M(N, "/ap/user/profile", {
                access_token: a
            }),
                d;
            window.XDomainRequest ? (d = new window.XDomainRequest, d.onload = function () {
                $(d.responseText, b)
            }) : (d = new window.XMLHttpRequest, d.onreadystatechange = function () {
                4 == d.readyState && $(d.responseText, b)
            });
            d.open("GET", c, !0);
            d.send()
        } else b({
            success: h,
            error: "UnsupportedOperation: Cannot retrieve profile in this browser"
        })
    };
    if ("function" == typeof window.onAmazonLoginReady) window.onAmazonLoginReady();

})();

