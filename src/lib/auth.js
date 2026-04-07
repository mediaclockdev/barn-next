import jwt from "jsonwebtoken";

export const getUserFromToken = (req) => {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    const decoded = jwt.decode(token);

    return decoded?.data?.user?.id;
}