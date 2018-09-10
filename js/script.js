let trains = {
    train1:{
        id: 'a',
        peoples:10,
        currentStation: 0,
        nextStation: null,
        currentIndex: 0,
        direction: 'forward',
        freeToMove: true,
        railway:{
            name: 'a',
            stantions: [1,2,'3c',4,'5b',6,7]
        }
    },
    train2: {
        id: 'b',
        peoples: 20,
        currentStation: 0,
        nextStation: null,
        currentIndex: 0,
        direction: 'forward',
        freeToMove: true,
        railway: {
            name: 'b',
            stantions: [1, 2, '3c', '4a', 5, 6]
        }
    },
    train3: {
        id: 'c',
        peoples: 30,
        currentStation: 0,
        nextStation: null,
        currentIndex: 0,
        direction: 'forward',
        freeToMove: true,
        railway: {
            name: 'c',
            stantions: [1, 2, '3a', '4b', 5, 6]
        }
    }
}

const init = (trains) => {


    let moveForvard = (trains) => {

        // update currentStation value and set nextStation value if it`s need reverce direction
        for (const key in trains) {
            trains[key].currentStation = trains[key].railway.stantions[trains[key].currentIndex] + trains[key].id;
            if (trains[key].direction == 'forward') {
                if (trains[key].currentIndex < trains[key].railway.stantions.length - 1) {
                    trains[key].nextStation = trains[key].railway.stantions[trains[key].currentIndex + 1] + trains[key].id;
                } else {
                    trains[key].direction = 'back'
                    trains[key].nextStation = trains[key].railway.stantions[trains[key].currentIndex - 1] + trains[key].id;
                }
            } else {
                if (trains[key].currentIndex > 0 ) {
                    trains[key].nextStation = trains[key].railway.stantions[trains[key].currentIndex - 1] + trains[key].id;
                } else {
                    trains[key].direction = 'forward'
                    trains[key].nextStation = trains[key].railway.stantions[trains[key].currentIndex + 1] + trains[key].id;
                }
            }
        }

        //compare stations between each other
        compareNextStations(trains);

        //move train to next station (if it possible)
        for (const key in trains) {
            if(trains[key].freeToMove){
                if (trains[key].direction == 'forward') {
                    trains[key].currentIndex++;
                } else {
                    trains[key].currentIndex--;
                }
            }
        }

        //reset freeToMove value for each train
        for (const key in trains) {
            trains[key].freeToMove = true;
        }
        console.log(trains)
    }

    // compare function
    let compareNextStations = (trains) => {
        for (const key in trains) {
            for (const value in trains) {
                if (trains[key] != trains[value]) {
                    //get letter value of comparable stations
                    if (setsEqual(getStationLiteral(trains[key].nextStation), getStationLiteral(trains[value].nextStation))) {
                        //compare trains by passengers or id
                        compareTrainProps(trains[key], trains[value]).freeToMove = false;
                    }
                }
            }
        }
    }

     //get letter value of stations
    let getStationLiteral = (stationName) => {
        return stationName.split('').splice(1)
    }

    //equal function
    let setsEqual = (a, b) => {
        return a.length === b.length && a.every(function (v) { return b.indexOf(v) !== -1; });
    }

    //compare by props function
    let compareTrainProps = (a, b) => {
        if(a.peoples == b.peoples){
            if (a.id > b.id){
                console.log(`----COLLISION----TRAIN----${b.id.toUpperCase()}----IS----WAITING----`)
                return b
            } else {
                console.log(`----COLLISION----TRAIN----${a.id.toUpperCase()}----IS----WAITING----`)
                return a
            }
        } else {
            if (a.peoples > b.peoples) {
                console.log(`----COLLISION----TRAIN----${b.id.toUpperCase()}----IS----WAITING----`)
                return b
            } else {
                console.log(`----COLLISION----TRAIN----${a.id.toUpperCase()}----IS----WAITING----`)
                return a
            }
        }
    }

    // start trains moving
    let interval = setInterval(()=> {
        moveForvard(trains)
    }, 2000);

    //stop trains moving
    // setTimeout(function () {
    //     clearInterval(interval);
    // }, 20000);

    
}

init(trains);

