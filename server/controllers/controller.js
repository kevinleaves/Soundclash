module.exports = {
  getPlaylists: (req, res) => {
    console.log(req, 'in controller')
    res.status(200).send('yo')
  }
}