import Ajv from "ajv";
import { MyError } from "../../Shared/Classes/error";

export const checkSchema = <T>(data: T, schema: any): T => {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (valid) {
        return data;
    } else {
        throw new MyError(400, 'bad request', validate.errors);
    }
};