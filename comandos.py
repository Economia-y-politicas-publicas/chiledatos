import os, requests
usuario = os.environ.get("BCENTRAL_USER")
password = os.environ.get("BCENTRAL_PASS")
print(usuario, password)

url = "https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx"
params = {
    "user": usuario, "pass": password,
    "function": "GetSeries", "timeseries": "F073.UFF.PRE.Z.D",
    "firstdate": "2024-01-01", "lastdate": "2026-07-22", "format": "json",
}
r = requests.get(url, params=params, timeout=10)
print(r.status_code)
print(r.text[:500])