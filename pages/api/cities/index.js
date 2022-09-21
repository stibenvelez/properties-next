import excuteQuery from "../../../lib/db";


export default async function handler(req, res) {
    try {
        let results = await excuteQuery({
            query: `        
                    SELECT c.*,
        d.departament
        FROM Cities AS c

        LEFT JOIN Departaments AS d ON d.idDepartament = c.IdDepartament
        ` })
        res.json({ results });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something went wrong" });
    }
}
