export abstract class BaseResponse<T>
{
    public success: boolean;
    public message: string;
    public resource: T;

    constructor(message: string, resource?: T) {

        if (resource) {
            this.resource = resource;
            this.success = true;
            this.message = '';
        }
        else{
            this.success = false;
            this.message = message;
        }

    }

}