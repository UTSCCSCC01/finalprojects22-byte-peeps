export default async function authenticateUser(req, res, next): Promise<any> {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  // TODO: Add authentication mechanism here
}