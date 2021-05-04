from files.workers.api import *
port = 6969
for key in db.keys():
 del db[key]
 
@app.exception(sanic.exceptions.NotFound)
async def ignore_404s(request, exception):
    return sanic.response.json({"errorCode":"errors.com.epicgames.common.not_found","errorMessage":"Sorry the resource you were trying to find could not be found","messageVars":[],"numericErrorCode":1004,"originatingService":"fortnite","intent":"prod-live"})


print('\033[30;1m')
app.run(host="0.0.0.0", port=port)