import excuteQuery from "../../../lib/db";

export default async function handle(req, res) {
 
    try {
      
        const query = `
        SELECT * 
        FROM CommentsProperties AS c
        WHERE c.propertyId = '1'
        `;

        let results = await excuteQuery({ query });

        if (results.error) {
            res.status(400).json({ message: "Something went wrong" });
            return;
        }
     
        res.json(results);
    } catch (error) {
        throw error;
    }
};
