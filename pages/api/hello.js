export default function handler(req, res){
  res.status(200).json({text: 'Hello'})
  
  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify({
  //   message: 'Hello Next.js'
  // }));
}