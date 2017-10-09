import defaultImg from './default.jpg';

export default {
    meta: {
        error: false,
        someMetaDate: 6,
    },
    result: [
        {
            ID: "FakeID123",
            Name: "GameName",
            StartTime: new Date(Date.UTC(2013, 1, 1, 14, 0, 0)),
            Location: {
                Lng: 43,
                Lat: -93.6319
            },
            Host: "HostUser",
            Members: [
                {
                    Username: "Kerno",
                    ProfilePic: defaultImg
                },
                {
                    Username: "PostMalone",
                    ProfilePic: defaultImg
                },
                {
                    Username: "MJ",
                    ProfilePic: defaultImg
                },
                {
                    Username: "SourPatch",
                    ProfilePic: defaultImg
                }
            ],
            Duration: 200,
            Sport: 0,
            Rating: 1400,
            AgeRange: [12,21],
            JoinCode: "LetMeJoin"
        }
    ]

}