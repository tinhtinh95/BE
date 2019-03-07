const generateLocation = (username, url) => {
    return {
        username,
        url,
        createAt: new Date().getTime()
    }
}

module.exports = generateLocation;