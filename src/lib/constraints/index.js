const constraints = {
    MAX_JOINCODE_LENGTH: 7,
    GameDuration: {
        SOCCER: 90,
        BASKETBALL: 120,
        VOLLEYBALL: 60,
        OTHERS: 60,
    }
}

export default Object.freeze(constraints);