import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ message: "Hello world!" });
    console.log("XDXDXD\n\n\nXDDXDXD")
}