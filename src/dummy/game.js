import defaultImg from './default.jpg';

export default {
    meta: {
        error: false,
        someMetaDate: 6,
    },
    result: [
        {
            id: "FakeID123",
            name: "GameName",
            starttime: new Date(Date.UTC(2013, 1, 1, 14, 0, 0)),
            location: {
                Lng: 43,
                Lat: -93.6319
            },
            host: "HostUser",
            members: [
                {
                    username: "Kerno",
                    profilepic: defaultImg
                },
                {
                    username: "PostMalone",
                    profilepic: defaultImg
                },
                {
                    username: "MJ",
                    profilepic: defaultImg
                },
                {
                    username: "SourPatch",
                    profilepic: defaultImg
                }
            ],
            duration: 200,
            sport: 0,
            rating: 1400,
            agerange: [12,21],
            joincode: "LetMeJoin"
        }
    ]

}