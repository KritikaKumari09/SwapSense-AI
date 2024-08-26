class ApiResponse {
    success;
    message;
    data;
    constructor(message,data= {},success){
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse