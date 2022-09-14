import { PrismaPromise } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { resError } from "../../Services/Helpers";
import { varifyJWT } from "../../Services/verifyJWT";

export  const getService = async <T>({
    req,
    res,
    callBack,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
    callBack: () => PrismaPromise<T>;
}) => {
    try {
        await varifyJWT(req, res);
        const result = await callBack();

        if (result) {
            res.status(200).json(result);
            return;
        }
        res.status(204).json('no content');
    } catch (err) {
        resError(err, res);
    }
};