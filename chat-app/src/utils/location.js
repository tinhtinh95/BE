const generateLocation = (url) => {
    return {
        url,
        createAt: new Date().getTime()
    }
}

module.exports = generateLocation;