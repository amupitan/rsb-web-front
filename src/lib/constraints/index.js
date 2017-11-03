const constraints = {
    MAX_JOINCODE_LENGTH: 7,
    GameDuration: {
        SOCCER: 90,
        BASKETBALL: 120,
        VOLLEYBALL: 60,
        OTHERS: 60,
    },
    MAX_FILE_SIZE: 2 * 1024 * 1024, //2 MB
}

export default Object.freeze(constraints);