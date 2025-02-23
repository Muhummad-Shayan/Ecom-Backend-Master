export function sendResponse(status,res,data = null,msg = "",err = null) {
    
    const response = {
        success: status < 400,
        message:msg
    }
    if(data) response.data = data
    if(err) response.error = err

    return res.status(status).json(response)

}