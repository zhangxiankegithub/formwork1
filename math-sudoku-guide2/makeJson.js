let fs = require('fs')
let Path = require('path')
const path = process.argv.slice(2);
const PATH = path;
console.log(path);
function readDirSync(path, fn) {
    var pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        var info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            readDirSync(path + "\\" + ele, fn);
        } else {
            fn && fn(path, ele);
        }
    })
}

function resolvePath(path1 = "./public/gameImage", canLoad = ['png', 'jpg'], font = "image") {
    let path2 = Path.resolve(path1);
    return new Promise((resolve, reject) => {
        let temp = [];
        readDirSync(path2, (path, ele) => {
            let str = ele.split(".");
            let name = str[0];
            let type = str[1];
            if (canLoad.includes(type)) {
                let truePath = path.split(path2)[1];
                let arrPath = truePath.split("\\");
                arrPath.shift();
                let Font = font + (arrPath.length === 0 ? "" : "-" + arrPath.join("-"));
                
                path1 = path1.split("/public").join("");
                path1 = path1.split("/"+PATH[0]).join("");
                if (arrPath.includes('animation') && !str.includes('json')) return;
                temp.push(JSON.stringify({
                    path: path1 + (arrPath.length === 0 ? "" : arrPath.join("/") + "/") + ele,
                    key: Font + "_" + name,
                    edit: false
                }))
            }
        });
        resolve(temp);
    });
}

let arrResource = [
    {
        baseSrc: "./public/common/images/",
        type: ['png', 'jpg'],
        prefix: "image"
    }, {
        baseSrc: "./public/" + path + "/resource/assets/pub/",
        type: ['png', 'jpg','mp3'],
        prefix: "pub"
    }, {
        baseSrc: "./public/" + path + "/resource/assets/pub/",
        type: ['json'],
        prefix: "pubAni"
    }, {
        baseSrc: "./public/" + path + "/resource/assets/images/",
        type: ['png', 'jpg'],
        prefix: "image"
    },
    {
        baseSrc: "./public/" + path + "/resource/assets/audios/",
        type: ['mp3'],
        prefix: "audio"
    },
    {
        baseSrc: "./public/" + path + "/resource/animation/",
        type: ['json'],
        prefix: "animation"
    }
];

function resourcePromise(paraArr) {
    let FinialArr = [];
    let count = paraArr.length;
    let A;
    let B;

    function onFinish(arr) {
        FinialArr.push.apply(FinialArr, arr);
        count--;
        if (count === 0) {
            A(FinialArr);
        }
    }

    for (let i = 0; i < count; i++) {
        resolvePath(paraArr[i].baseSrc, paraArr[i].type, paraArr[i].prefix).then((arr) => {
            onFinish(arr);
        });
    }
    return new Promise((a, b) => {
        A = a;
    });
}

resourcePromise(arrResource).then((arr) => {
    if (fs.existsSync("./public/" + path + "/resource/resource.json")) {
        fs.unlinkSync("./public/" + path + "/resource/resource.json")
    }
    fs.appendFile('./public/' + path + '/resource/resource.json', '[' + arr + ']', (e, v) => {
        console.log(e)
    });
});
// resolvePath().then((arr) => {
//   console.log(arr);
//   // if(fs.existsSync(audioPath+"/resource.json")){
//   //   fs.unlinkSync(audioPath + '/resource.json')
//   // }
//   // if (fs.existsSync(imagePath + '/resource.json')) {
//   //   fs.unlinkSync(imagePath + '/resource.json')
//   // }
//   // fs.appendFile(imagePath + '/resource.json', '[' + arr + ']', (e, v) => {
//   //   console.log(e)
//   // });
//   // fs.appendFile(audioPath+"/resource.json","["+arr1+"]", (e, v) => {
//   //   console.log(e)
//   // });
// })



