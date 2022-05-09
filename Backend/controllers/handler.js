const handler = async (response, execute) => {
    try {
        await execute()
    }
    catch (err) {
        console.error(err)
        response.status(500).json({ msg: "INTERNAL SERVER ERROR" })
    }
}

module.exports = handler