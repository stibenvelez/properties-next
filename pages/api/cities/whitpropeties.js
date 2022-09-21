import excuteQuery from "../../../lib/db";

export default async function handler(req, res) {

    try {
        let results = await excuteQuery({
            query: `        
        SELECT c.*,
        d.departament,
        COUNT(c.cityId) AS countProperties,
        COUNT(IF(p.offerId = 1, 1, NULL)) countSell,
        COUNT(IF(p.offerId = 2, 1, NULL)) countRent,
        o.offer
        FROM Cities AS c

        LEFT JOIN Departaments AS d ON d.idDepartament = c.IdDepartament
        INNER JOIN Properties AS p ON p.cityId = c.cityId
        INNER JOIN Offer AS o ON o.offerId = p.offerId
        GROUP BY c.cityId
        ORDER BY COUNT(c.cityId) DESC
        ` })
        res.json({ results });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something went wrong" });
    }
}
